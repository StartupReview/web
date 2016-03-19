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
        description: 'Take a walk in the shoes of this company’s prospective customers - is this a truly painful problem and how badly would you want it solved? If you’re feeling ambitious, you may even reach out to a few potential customers to get their thoughts.',
        url: _getAbsoluteUrl() + '/problem'
      }, {
        id: $scope.company.id + '/solution-' + appConfig.ENV,
        name: 'Solution',
        description: 'Keep your customer hat on for this one: do you think this solution would do the trick? (i.e., does it directly address the problem?) If so, is it unique? Or could it be easily duplicated by a competitor?',
        url: _getAbsoluteUrl() + '/solution'
      }, {
        id: $scope.company.id + '/market-' + appConfig.ENV,
        name: 'Market',
        description: 'If the company is ultimately able to execute, would the juice be worth the squeeze? Sheer size of the market is important, but be sure to look at the way the market/industry is trending and who else is already battling for market share (competitors).',
        url: _getAbsoluteUrl() + '/market'
      }, {
        id: $scope.company.id + '/team-' + appConfig.ENV,
        name: 'Team',
        description: 'Chances are, if this is a big enough problem with huge upside, then there are other humans working on it. Is this team going to be the last one standing? Are they uniquely qualified and positioned to build this company?',
        url: _getAbsoluteUrl() + '/team'
      }, {
        id: $scope.company.id + '/timing-' + appConfig.ENV,
        name: 'Timing',
        description: 'You’ve heard it before, “timing is everything.” This may be the factor most correlative to success, but, unfortunately, it’s almost entirely out of the company’s control. Hopefully they’ve identified a list of reasons for why the time is now to seize the carpe! Are they right? What social, technological, or economic factors make the timing right.',
        url: _getAbsoluteUrl() + '/timing'
      }, {
        id: $scope.company.id + '/business_model-' + appConfig.ENV,
        name: 'Business Model',
        description: 'Does this company have a viable business model for delivering value to their customers? Can they accomplish this for a profit? Fortunately, this is a rather malleable factor that is almost guaranteed to change. But look at their current model, does it make sense? Is it dynamic? Will it scale?',
        url: _getAbsoluteUrl() + '/business_model'
      }, {
        id: $scope.company.id + '/traction-' + appConfig.ENV,
        name: 'Traction',
        description: 'Has this team seen traction in any relevant success metric(s)? This doesn’t have to be dollars or total users. Most companies have certain metrics that they feel will get them to an inflection point. Your job is to determine whether the company has picked the right metrics to optimize for and whether they are seeing a positive trajectory in each of those metrics.',
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
