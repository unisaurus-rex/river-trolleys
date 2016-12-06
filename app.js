import {trolleyData} from "data.js";
import lineChart from "lineChart.js";
import {buildRiverArrays} from "dataparser.js";
import * as d3 from "./bower_components/d3/d3.js";

var height = 600;
var width = 900;

var svg = d3.select('#chartContainer')
    .append('svg')
    .attr("height", height)
    .attr("width", width);


// Chart will show number of trolleys in a river per year
// x axis is year
// y axis is trolleys

window.trolley = lineChart()
  .height(height)
  .width(width)
  .marginTop(40)
  .marginBottom(40)
  .marginLeft(60)
  .marginRight(40)
  .xDomain([2005,2012])
  .yDomain([0,90])
  .xDataAccessor( (d) => { return parseInt( d[9] ); })
  .yDataAccessor( (d) => {
    let count = d[10];
    if(count === null){
      return 0;
    }
    return parseInt(count);
  });

/***** Add Axes *****/

var xAxisGroup = svg.append('g').attr("transform", "translate(0," + (trolley.height() - trolley.marginBottom() ) + ")");
var xAxis = d3.axisBottom(trolley.xScale() );
xAxis(xAxisGroup);

var yAxisGroup = svg.append('g').attr("transform", "translate(" + trolley.marginLeft() + ", 0)");
var yAxis = d3.axisLeft(trolley.yScale() ).ticks(10);
yAxis(yAxisGroup);

/***** Draw Grid Lines *****/
var xGridLineGroup = svg.append('g')
    .attr("transform", "translate(0," + (trolley.height() - trolley.marginBottom() ) + ")")
    .attr("class", "gridline");
var xGridLines = d3.axisBottom(trolley.xScale() )
    .ticks(10)
    .tickSize( -( trolley.height() - trolley.marginTop() - trolley.marginBottom() ) )
    .tickFormat("");
xGridLines(xGridLineGroup);

var yGridLineGroup = svg.append('g')
    .attr("transform", "translate(" + trolley.marginLeft() + ", 0)")
    .attr("class", "gridline");
var yGridLines = d3.axisLeft( trolley.yScale() )
    .ticks(10)
    .tickSize( -( trolley.width() - trolley.marginLeft() - trolley.marginRight() ))
    .tickFormat("");
yGridLines(yGridLineGroup);

/***** Draw Lines *****/

// parse trolleyData into something we can pass to d3
var riverData = buildRiverArrays(trolleyData); 
var container = svg.append("g").attr("id", "lines").classed("rivers", true);
// ln is d3 selection containing all path objects
var ln = trolley(container, riverData);

// create a function that returns a unique color for unique inputs
var color = d3.scaleOrdinal(d3.schemeCategory20);
// color each river line with a distinct color 
ln.style("stroke", (d) => {
  var name = d[0][8];
  return color(name);
});

/***** For testing in console *****/
window.d3 = d3;
window.container = container;
window.s = riverData.slice(0,5);
