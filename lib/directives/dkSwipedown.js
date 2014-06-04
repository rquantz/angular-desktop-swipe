angular.module('desktopSwipe').directive('dkSwipedown', ['$parse', function($parse) {

  return {
    compile: function($element, attr) {
      var fn = $parse(attr['dkSwipedown']);
      return function(scope, element, attr) {
        element.on('dk.swipedown', function(event) {
          scope.$apply(function() {
            fn(scope);
          });
        });
      };
    }
  }
}]);

