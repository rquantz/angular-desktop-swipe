angular.module('desktopSwipe.services', []);
angular.module('desktopSwipe', ['desktopSwipe.services']);

angular.module('desktopSwipe.services').factory('dkSwipeObserver', function() {

  var config = {
    sample: 20,
    diffThreshold: 6
  }

  var EventRepo = function() {
    return {
      prev: [],
      curr: [],
      locked: false
    }
  }

  var SwipeObserver = function() {
    return {

      capture: function(e, delta) {
        if (e.deltaY < 0) {
          // swipe up
          this._capture(this._up, e, delta) && this._swipeup();
        }
        else if (e.deltaY > 0) {
          // swipe down
          this._capture(this._down, e, delta) && this._swipedown();
        }
      },

      swipeup: function(callback) {
        this._swipeup = callback;
      },
      swipedown: function(callback) {
        this._swipedown = callback;
      },


      _capture: function(repo, e, delta) {
        var diff, swiped = false;

        repo.curr.push(Math.abs(delta));

        if (repo.curr.length > config.sample) {
          repo.prev.push(repo.curr.shift());
        }
        if (repo.prev.length > config.sample) {
          repo.prev.shift();
        }

        diff = mean(repo.curr) - mean(repo.prev);

        if ( (diff > config.diffThreshold) && !repo.locked ) {
          swiped = true;
          repo.locked = true;
        }
        else if (diff < 0) {
          repo.locked = false;
        }

        return swiped;
      },


      _swipeup: function() {},
      _swipedown: function() {},
      _up: new EventRepo(),
      _down: new EventRepo()

    }
  }

  function mean(arr) {
    var sum = 0, avg = 0;

    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      avg = sum / arr.length;
    }

    return avg;
  }



  return {
    get: function() {
      return new SwipeObserver();
    }
  }
});

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

