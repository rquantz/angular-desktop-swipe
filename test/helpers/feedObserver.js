function feedObserver(observer, events) {
  for (var i = 0; i < events.length; i++) {
    observer.capture(events[i][0], events[i][1]);
  }
}
