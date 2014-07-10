angular.module('desktopSwipe').directive('dkSwipedown', ['$parse', 'dkSwipeObserver', function($parse, dkSwipeObserver) {

  return {
    compile: function($element, attr) {
      var fn = $parse(attr['dkSwipedown']);
      var observer = dkSwipeObserver.get();

      return function(scope, element, attr) {

        observer.swipedown(function() {
          element.trigger('dk.swipedown');
        });

        element.on('mousewheel', function(e, delta) {
          observer.capture(e, delta);
          return false;
        });

        element.on('dk.swipedown', function(event) {
          scope.$apply(function() {
            fn(scope);
          });
        });
      };
    }
  }
}]);

