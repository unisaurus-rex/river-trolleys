import {trolleyData} from "data.js";
// import lineChart from "lineChart.js";
import {select} from "./bower_components/d3-selection/index.js";

var height = 600;
var width = 900;
var margin = {
  bottom: 40,
  left: 40
}

var svg = select('#chartContainer')
    .append('svg')
    .attr("height", height)
    .attr("width", width);


// Chart will show number of trolleys in a river per year
// x axis is year
// y axis is trolleys

// window.trolley = lineChart();
//var trolley = lineChart().height(height).width(width).marginTop(40).marginBottom(40).marginLeft(40).marginRight(40);
