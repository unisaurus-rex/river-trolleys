export default function lineChart() {
  var width = 900,
      height = 700,
      margins = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      },
      // Inclusive ranges for mapping x and y axis values to pixels
      xDomain = [0,0], 
      yDomain = [0,0],
      xScale,
      yScale;

  function chart() {
    // generate chart in here
    console.log("width: " + width + " height: " + height + " margins: " + margins);
  }

  // in javascript, functions are objects, which means we can add properties to them
  // additionally if each sub function returns chart, the function calls become chainable
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

  chart.xDomain = function(limitsArr){
    if(!arguments.length) return xDomain;

    xDomain = d3.range(limitsArr[0], limitsArr[1]);
    xScale = d3.scalePoint().domain(xDomain).range([margins.left, width - margins.right]);
    return chart;
  }

  chart.xScale = function(value){
    return xScale(value);
  }

  chart.yDomain = function(value){
    if(!arguments.length) return yDomain;

    yDomain = value;
    yScale = d3.scaleLinear().domain(yDomain).range([(height - margins.bottom), margins.top]);
    return chart;
  }

  chart.yScale = function(value){
    return yScale(value);
  }
  
  return chart;
}
