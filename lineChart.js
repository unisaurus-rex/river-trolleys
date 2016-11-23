export default function lineChart() {
  var width = 900,
      height = 700,
      margins = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      },
      xDomain,
      yDomain;

  function chart() {
    // generate chart in here
    console.log("width: " + width + " height: " + height + " margins: " + margins);
  }

  // in javascript, functions are objects, which means we can add properties to them
  chart.width = function(value){
    if(!arguments.length) return width;

    width = value;
    return chart;    
  }

  chart.height = function(value){
    if(!arguments.length) return height;

    height = value;
    return chart;
  }

  chart.marginTop = function(value){
    if(!arguments.length) return margins.top;

    margins.top = value;
    return chart;
  }

  chart.marginBottom = function(value){
    if(!arguments.length) return margins.bottom;

    margins.bottom = value;
    return chart;
  }

  chart.marginLeft = function(value){
    if(!arguments.length) return margins.left;

    margins.left = value;
    return chart;
  }

  chart.marginRight = function(value){
    if(!arguments.length) return margins.right;

    margins.right = value;
    return chart;
  }

  return chart;
}
