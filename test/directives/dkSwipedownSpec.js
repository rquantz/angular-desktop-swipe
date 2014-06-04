describe('dkSwipedown', function() {
  var element;

  beforeEach(module('desktopSwipe'));

  it('should execute the callback on dk.swipedown', inject(function($rootScope, $compile) {
    element = $compile('<div dk-swipedown="swiped = true"></div>')($rootScope);
    $rootScope.$digest();

    expect($rootScope.swiped).toBeUndefined();

    element.triggerHandler('dk.swipedown');
    expect($rootScope.swiped).toBe(true);
  }));

});
