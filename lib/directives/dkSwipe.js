angular.module('desktopSwipe').directive('dkSwipeup', function() {

  return {
    compile: function($element, attr) {
      /*
      var fn = $parse(attr['dk-swipeup']);
      return function(scope, element, attr) {
        element.on('dk.swipeup', function(event) {
          scope.$apply(function() {
            fn(scope);
          });
        });
      };
      */
    }
  }
});
