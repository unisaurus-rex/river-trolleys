import {trolleyData} from "data.js";

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


/*** Build x-axis translations ***/

// Get the range of years from the data
// need accessor function for trolley data
function getYear(d) {
  return parseInt(d[9]);
}

// get first and last years
var yearLimits = d3.extent(trolleyData, getYear);
// need a list of all years from first to last
var yearDomain = d3.range(yearLimits[0], yearLimits[1] + 1);

// Set an ordinal scale from years to pixels
// range and domain must be arrays
var xScale = d3.scalePoint().domain(yearDomain).range([40, width - margin.left]);

/*** Build y-axis translations ***/

// trolley count accessor function
function getTrolleyCount(d) {
  return parseInt(d[10]);
}

// get highest count of trolleys
var trolleyMax = d3.max(trolleyData, getTrolleyCount);
// need a list of all counts from 0 to trolleyMax
// d3.range limit is exclusive so add 1 to max
var trolleyDomain = d3.range(0, trolleyMax + 1);

// build scale from trolley count to y pixels
var yScale = d3.scaleLinear().domain([0, trolleyMax]).range([(height - margin.bottom), margin.left]);

// get a list of unique river names
var riverNames = trolleyData.map(function(d){return d[8];});
riverNames = Array.from(new Set(riverNames));

function lineX(d){
  return xScale(parseInt(d[9]));
}

function lineY(d){
  return yScale(parseInt(d[10]));
}

var lineFunc = d3.line().x(lineX).y(lineY);


// need a list of colors with the same length as river names so we can style each river differently
// 18 rivers in the dataset
// sets the range of colors to a color scheme, since no domain provided, d3 will create a unique mapping from val to range as values provided
var color = d3.scaleOrdinal(d3.schemeCategory20);

// draw line
// build line container
var g = svg.append('g').classed('rivers', true);

for(var i = 0; i < riverNames.length; i++){
  var riverData = trolleyData.filter((d) => { return d[8] == riverNames[i]});
  g.append('path').attr('d', lineFunc(riverData)).style("stroke", (d) => {return color(riverNames[i]);});
}

var xAxisGroup = svg.append('g').attr("transform", "translate(0," + (height - margin.bottom) + ")");
var xAxis = d3.axisBottom(xScale);
xAxis(xAxisGroup);

var yAxisGroup = svg.append('g').attr("transform", "translate(" + margin.left + ", 0)");
var yAxis = d3.axisLeft(yScale).ticks(10);
yAxis(yAxisGroup);
