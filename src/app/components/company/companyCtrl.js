angular.module('startupReviewApp').controller('companyCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$location',
  'companyService',
  'appConfig',
  function($scope, $state, $stateParams, $location, companyService, appConfig) {
    $scope.company = null;

    _getCompany();

    $scope.slides = [];

    $scope.carouselOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      init: function() {}
    };

    $scope.activateSection = function(section, $event) {
      if ($event) $event.preventDefault();

      $scope.currentSection = section;

      $location.search('section', section.name);
    };

    // private helpers

    function _getCompany() {
      $scope.loading = true;

      companyService.getById($stateParams.id)
        .then(function(company) {
          $scope.loading = false;
          $scope.company = company;

          $scope.slides = company.slides;

          $scope.carouselOptions.init();

          _initSections();
        })
        .catch(function() {
          $state.go('home');
        });
    }

    function _initSections() {
      $scope.sections = [{
        id: $scope.company.id + '/problem-' + appConfig.ENV,
        name: 'Problem',
        url: $location.absUrl() + '/problem'
      }, {
        id: $scope.company.id + '/solution-' + appConfig.ENV,
        name: 'Solution',
        url: $location.absUrl() + '/solution'
      }, {
        id: $scope.company.id + '/market-' + appConfig.ENV,
        name: 'Market',
        url: $location.absUrl() + '/market'
      }, {
        id: $scope.company.id + '/team-' + appConfig.ENV,
        name: 'Team',
        url: $location.absUrl() + '/team'
      }, {
        id: $scope.company.id + '/timing-' + appConfig.ENV,
        name: 'Timing',
        url: $location.absUrl() + '/timing'
      }, {
        id: $scope.company.id + '/business_model-' + appConfig.ENV,
        name: 'Business Model',
        url: $location.absUrl() + '/business_model'
      }, {
        id: $scope.company.id + '/traction-' + appConfig.ENV,
        name: 'Traction',
        url: $location.absUrl() + '/traction'
      }];
 
      var activeSection;
      var locationParams = $location.search();

      if (locationParams && locationParams.section) {
        activeSection = _.findWhere($scope.sections, {
          name: locationParams.section
        });
      }

      activeSection = activeSection || $scope.sections[0];

      $scope.activateSection(activeSection);
    }
  }
]);
