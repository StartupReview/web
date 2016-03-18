angular.module('startupReviewApp').controller('companyCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$location',
  '$timeout',
  'companyService',
  'appConfig',
  function($scope, $state, $stateParams, $location, $timeout, companyService, appConfig) {
    $scope.company = null;

    _getCompany();

    $scope.slides = [];

    $scope.disqusHandle = {};

    $scope.carouselOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      init: function() {}
    };

    $scope.activateSection = function(section, options, $event) {
      if (arguments.length === 2) {
        options = $event;
      }

      options = options || {};

      options.setSearch = ('setSearch' in options) ? options.setSearch : true;

      if ($event) $event.preventDefault();

      $scope.currentSection = section;

      if (options.setSearch) $location.search('section', section.name);

      $timeout(function() {
        if ($scope.disqusHandle.refresh) $scope.disqusHandle.refresh({
          identifier: $scope.currentSection.id,
          url: $scope.currentSection.url,
          title: $scope.company.title
        });
      });
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
        url: _getAbsoluteUrl() + '/problem'
      }, {
        id: $scope.company.id + '/solution-' + appConfig.ENV,
        name: 'Solution',
        url: _getAbsoluteUrl() + '/solution'
      }, {
        id: $scope.company.id + '/market-' + appConfig.ENV,
        name: 'Market',
        url: _getAbsoluteUrl() + '/market'
      }, {
        id: $scope.company.id + '/team-' + appConfig.ENV,
        name: 'Team',
        url: _getAbsoluteUrl() + '/team'
      }, {
        id: $scope.company.id + '/timing-' + appConfig.ENV,
        name: 'Timing',
        url: _getAbsoluteUrl() + '/timing'
      }, {
        id: $scope.company.id + '/business_model-' + appConfig.ENV,
        name: 'Business Model',
        url: _getAbsoluteUrl() + '/business_model'
      }, {
        id: $scope.company.id + '/traction-' + appConfig.ENV,
        name: 'Traction',
        url: _getAbsoluteUrl() + '/traction'
      }];

      var activeSection = $scope.sections[0];
      var locationParams = $location.search();

      if (locationParams && locationParams.section) {
        activeSection = _.findWhere($scope.sections, {
          name: locationParams.section
        });

        $scope.activeSection = activeSection;
      }

      $scope.activateSection(activeSection, {
        setSearch: false
      }, null);
    }

    function _getAbsoluteUrl() {
      var url = $location.absUrl();

      if (url.indexOf('?') > 0) {
        url = url.split('?')[0];
      }

      return url;
    }
  }
]);
