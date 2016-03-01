angular.module('startupReviewApp').controller('companyCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'companyService',
  function($scope, $state, $stateParams, companyService) {
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

    // private helpers

    function _getCompany() {
      $scope.loading = true;

      companyService.getById($stateParams.id)
        .then(function(company) {
          $scope.loading = false;
          $scope.company = company;

          $scope.slides = company.slides;

          $scope.carouselOptions.init();
        })
        .catch(function() {
          $state.go('home');
        });
    }
  }
]);
