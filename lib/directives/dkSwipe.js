angular.module('desktopSwipe').directive('dkSwipeup', ['$parse', function($parse) {

  return {
    compile: function($element, attr) {
      var fn = $parse(attr['dkSwipeup']);
      return function(scope, element, attr) {
        element.on('dk.swipeup', function(event) {
          scope.$apply(function() {
            fn(scope);
          });
        });
      };
    }
  }
}]);
