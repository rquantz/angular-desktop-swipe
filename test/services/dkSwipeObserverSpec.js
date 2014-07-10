describe('dkSwipeObserver', function() {
  var observer;

  beforeEach(module('desktopSwipe'));

  beforeEach(inject(function(dkSwipeObserver) {
    observer = dkSwipeObserver.get();
  }));


  describe('#swipeup', function() {
    var mock;

    beforeEach(function() {
      callback = jasmine.createSpy();
      observer.swipeup(callback);
    });

    it('is called when a swipeup event occurs', function() {
      angular.forEach(singleSwipeUp, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(1);
        callback.calls.reset();
      });
    });

    it('can recognize multiple swipes', function() {
      angular.forEach(doubleSwipeUp, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(2);
        callback.calls.reset();
      });
    });

    it('does not trigger for non-swipes', function() {
      angular.forEach(dragUp, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(0);
        callback.calls.reset();
      });
    });
  });


  describe('#swipedown', function() {
    var mock;

    beforeEach(function() {
      callback = jasmine.createSpy();
      observer.swipedown(callback);
    });

    it('is called when a swipedown event occurs', function() {
      angular.forEach(singleSwipeDown, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(1);
        callback.calls.reset();
      });
    });

    it('can recognize multiple swipes', function() {
      angular.forEach(doubleSwipeDown, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(2);
        callback.calls.reset();
      });
    });

    it('does not trigger for non-swipes', function() {
      angular.forEach(dragDown, function(events) {
        feedObserver(observer, events);
        expect(callback.calls.count()).toEqual(0);
        callback.calls.reset();
      });
    }); 
  });
});
