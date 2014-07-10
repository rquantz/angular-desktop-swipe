$(function() {

  var output = [], current;

  $('.start').on('click', function() {
    output.push([]);
    current = output.length - 1;
  });

  $('.stop').on('click', function() {
    current = null;
    renderOutput();
  });


  $(window).on('mousewheel', function(event, delta) {
    if (current == null) { return true; }

    output[current].push([event, delta]);

    renderOutput();
    return false;
  });



  function renderOutput() {
    var outputString = "\nvar output = [\n";

    for (var i = 0; i < output.length; i++) {
      outputString += "  [\n";

      for (var j = 0; j < output[i].length; j++) {
        outputString += "    [";
        outputString += "{";
        outputString += "deltaX: " + output[i][j][0].deltaX;
        outputString += ", ";
        outputString += "deltaY: " + output[i][j][0].deltaY;
        outputString += "}, ";
        outputString += output[i][j][1];
        outputString += "],\n";
      }

      if (i == output.length - 1) {
        outputString += "  ]\n";
      }
      else {
        outputString += "  ],\n";
      }
    }
    outputString += "];";

    $('.output').html(outputString);
  }

});
