angular.module('startupReviewApp').controller('companyCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$location',
  'companyService',
  function($scope, $state, $stateParams, $location, companyService) {
    $scope.company = null;

    _getCompany();

    $scope.slides = [];

    $scope.carouselOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      init: function() {},
      // responsive: [{
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //     infinite: true,
      //     dots: true
      //   }
      // }, {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // }, {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1
      //   }
      // }]
    };

    $scope.activateSection = function(section, $event) {
      if ($event) $event.preventDefault();

      $scope.currentSection = section;
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
        id: $scope.company.id + '/problem',
        name: 'Problem',
        url: $location.absUrl() + '/problem'
      }, {
        id: $scope.company.id + '/solution',
        name: 'Solution',
        url: $location.absUrl() + '/solution'
      }, {
        id: $scope.company.id + '/market',
        name: 'Market',
        url: $location.absUrl() + '/market'
      }, {
        id: $scope.company.id + '/team',
        name: 'Team',
        url: $location.absUrl() + '/team'
      }, {
        id: $scope.company.id + '/timing',
        name: 'Timing',
        url: $location.absUrl() + '/timing'
      }, {
        id: $scope.company.id + '/business_model',
        name: 'Business Model',
        url: $location.absUrl() + '/business_model'
      }, {
        id: $scope.company.id + '/traction',
        name: 'Traction',
        url: $location.absUrl() + '/traction'
      }];

      $scope.currentSection = $scope.sections[0];
    }
  }
]);
