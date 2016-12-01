// import {scalePoint as d3ScalePoint, scaleLinear as d3ScaleLinear} from "./bower_components/d3-scale/index.js"; 
// import {range as d3Range} from "./bower_components/d3-array/index.js";
import * as d3 from "./bower_components/d3/d3.js";

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
      xScale, // function, takes x axis value and converts to pixel value
      yScale, // function, takes y axis value and converts to pixel value
      lineFunc = d3.line(); // generates a path string for a line

  // container: d3 selection object that should contain the lines to be drawn
  function chart(container, dataArr) {
    let startLineFunc = d3.line()
        .x( (d) => {return margins.left} )
        .y( (d) => {return width - margins.top} );
    
    // TODO: handle update and exit selections 
    var sel = container.selectAll("path")
        .data(dataArr);

    sel.enter()
      .append("path")
      .attr("d", lineFunc)
      .attr("stroke-dasharray", "2000 2000")
      .attr("stroke-dashoffset", "2000")
      .transition()
      .duration(1500)
      .ease(d3.easeQuadInOut)
      .attr("stroke-dashoffset", "0");

    sel.exit()
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", "-2000")
      .ease(d3.easeLinear)
      .remove(); 

    return container.selectAll("path");
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

  // func should take a data object and return the value in the object that needs to be converted to a pixel on the x axis
  chart.xDataAccessor = function(func){
    lineFunc.x( (d) => { return xScale( func(d) ); });
    return chart;
  };

  // xDomain is the lower and upper limits on possible x values, if limitsArr is passed to function
  // set xDomain and the use the domain to set the xScale, which is a d3 function that we use to conver x
  // values to pixel values
  chart.xDomain = function(limitsArr){
    if(!arguments.length) return xDomain;

    // d3.scalePoint takes a list of values, create the list with .range and pass to scalePoint
    xDomain = d3.range(limitsArr[0], limitsArr[1]); 
    xScale = d3.scalePoint().domain(xDomain).range([margins.left, width - margins.right]);
    return chart;
  }

  chart.xScale = function(value){
    return xScale(value);
  }

  // func should take a data object and return the value in the object that needs to be converted to a pixel on the y axis
  chart.yDataAccessor = function(func){
    lineFunc.y( (d) => { return yScale( func(d) ); });
    return chart;
  };

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
