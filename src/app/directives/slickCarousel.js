angular.module('startupReviewApp').directive('slickCarousel', [
  '$compile',
  '$timeout',
  function($compile, $timeout) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        slides: '=',
        options: '=',
        currentIndex: '=',
        preSlide: '@',
        trigger: '@',
        fade: '@'
      },
      template: '<div><ng-transclude></ng-transclude></div>',
      link: function(scope, element) {

        var isInitialized = false;
        var firstInitialization = true;
        var TEMPLATE_CACHE = {};

        //scope.preSlide === undefined || scope.preSlide === null ? true : (scope.preSlide === "false" ? false : scope.preSlide);

        scope.options = scope.options || {};
        scope.options.autoplay = scope.options.autoplay || false;
        scope.options.infinite = scope.options.infinite || false;
        scope.loading = true;
        scope.init = scope.options.init = init;

        scope.onClick = function(slide) {
          if (scope.options.onClick) {
            scope.options.onClick.call(this, slide);
          }
        };

        //called whenever ng-repeat finishes rendering
        scope.onFinishRender = function() {
          $timeout(function() {
            var $slickWrapper = element.find('.slick-wrapper');
            //console.log('SLICK - on finished render');
            $slickWrapper.slick(scope.options);
          });
        };

        function initializeWrapper(next) {
          return $timeout(function() {
            var slickTemplate;

            if (firstInitialization) {
              slickTemplate = element.find('[slick-template]');
              slickTemplate = slickTemplate ? slickTemplate[0] : null;

              if (!slickTemplate) throw new Error('must have a slick template attribute');

              var slickTemplateContents = $(slickTemplate).html();

              var $template = $('<div></div>');
              $template.attr('ng-repeat', 'slide in slides');
              $template.attr('on-finish-render', 'onFinishRender()');

              for (var key in slickTemplate.attributes) {
                var attr = slickTemplate.attributes[key];
                $template.attr(attr.name, attr.value);
              }

              $template.html(slickTemplateContents);

              TEMPLATE_CACHE.prevArrow = element.find('[slick-previous]');
              TEMPLATE_CACHE.nextArrow = element.find('[slick-next]');
              TEMPLATE_CACHE.slickTemplate = $template.clone();
            }

            element.empty();

            var $slickWrapper = $('<div class="slick-wrapper"></div>');

            var prevArrow = TEMPLATE_CACHE.prevArrow.clone();
            var nextArrow = TEMPLATE_CACHE.nextArrow.clone();
            slickTemplate = TEMPLATE_CACHE.slickTemplate.clone();

            element.append($slickWrapper);

            $slickWrapper.attr('ng-show', 'loading');

            element.append(prevArrow);
            element.append(nextArrow);

            $compile(slickTemplate)(scope, function(clone) {
              $slickWrapper.append(clone);
            });

            scope.options.prevArrow = prevArrow;
            scope.options.nextArrow = nextArrow;

            $slickWrapper.on('beforeChange', function(event, slick, currentSlide) {
              scope.$apply(function() {
                scope.currentIndex = currentSlide;
              });
            });

            if (next) next();
          });
        }

        function init() {

          //console.log('INIT');

          if (isInitialized) {
            destroySlick(function() {
              initializeWrapper(function() {
                isInitialized = true;
                firstInitialization = false;

                if (!scope.trigger) {
                  var $slickWrapper = element.find('.slick-wrapper');
                  //console.log('SLICK');
                  $slickWrapper.slick(scope.options);
                }
              });
            });
          } else {
            initializeWrapper(function() {
              isInitialized = true;
              firstInitialization = false;

              if (!scope.trigger) {
                var $slickWrapper = element.find('.slick-wrapper');
                //console.log('SLICK');
                $slickWrapper.slick(scope.options);
              }
            });
          }
        }

        scope.$watch('slides', function(val) {
          if (!val || !val.length) return;

          if (isInitialized || !scope.trigger) {
            //console.log('REINIT');

            init();
          }
        });

        function destroySlick(next) {
          //console.log('DELETE SLICK');

          //scope.slides.slice(0, scope.slides.length);

          var $slickWrapper = element.find('.slick-wrapper');

          return $timeout(function() {
            try {
              $slickWrapper.slick('unslick');
              element.find('.slick-list').remove();
            } catch (err) {

            }

            isInitialized = false;

            if (next) next();
          });
        }
      }
    };
  }
]);

angular.module('startupReviewApp').directive('onFinishRender', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        if (scope.$last === true) {
          return scope.$evalAsync(attrs.onFinishRender);
        }
      }
    };
  }
]);

angular.module('startupReviewApp').directive('backgroundImageUrl', [
  function() {
    return {
      restrict: 'A',
      scope: {
        backgroundImageUrl: '='
      },
      link: function(scope, element) {
        element.css('background-image', 'url(\'' + scope.backgroundImageUrl + '\')');
      }
    };
  }
]);
