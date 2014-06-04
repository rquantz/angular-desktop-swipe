describe('desktopSwipe', function() {
  var element;

  beforeEach(module('desktopSwipe'));

  describe('dkSwipeup', function() {

    it('should execute the callback on dk.swipeup', inject(function($rootScope, $compile) {
      element = $compile('<div dk-swipeup="swiped = true"></div>')($rootScope);
      $rootScope.$digest();

      expect($rootScope.swiped).toBeUndefined();

      element.triggerHandler('dk.swipeup');
      expect($rootScope.swiped).toBe(true);
    }));

  });
});
