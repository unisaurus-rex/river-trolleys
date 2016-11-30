import {trolleyData} from "data.js";
import lineChart from "lineChart.js";
import * as d3 from "./bower_components/d3/d3.js";
// import {select as d3Select} from "./bower_components/d3-selection/index.js";
// import * as d3-selection from "./bower_components/d3-selection/index.js";

var height = 600;
var width = 900;
var margin = {
  bottom: 40,
  left: 40
}

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
  .marginLeft(40)
  .marginRight(40)
  .xDomain([2005,2012])
  .yDomain([0,90])
  .xDataAccessor( (d) => { return parseInt( d[9] ); })
  .yDataAccessor( (d) => { return parseInt( d[10] ); });

// get a list of unique river names
var riverNames = trolleyData.map(function(d){return d[8];});
riverNames = Array.from(new Set(riverNames));

// get the data for only one river
var riverData = trolleyData.filter((d) => { return d[8] == riverNames[0]});
var container = svg.append("g").attr("id", "lines");
window.container = container;
var ln = trolley(container, riverData);
ln.classed("rivers", true).style("stroke", "cornflowerblue");


