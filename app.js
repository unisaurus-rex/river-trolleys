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
