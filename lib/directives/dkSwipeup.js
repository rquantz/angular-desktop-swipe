angular.module('desktopSwipe').directive('dkSwipeup', ['$parse', 'dkSwipeObserver', function($parse, dkSwipeObserver) {

  return {
    compile: function($element, attr) {
      var fn = $parse(attr['dkSwipeup']);
      var observer = dkSwipeObserver.get();

      return function(scope, element, attr) {

        observer.swipeup(function() {
          element.trigger('dk.swipeup');
        });

        element.on('mousewheel', function(e, delta) {
          observer.capture(e, delta);
          return false;
        });

        element.on('dk.swipeup', function(event) {
          scope.$apply(function() {
            fn(scope);
          });
        });
      };
    }
  }
}]);

