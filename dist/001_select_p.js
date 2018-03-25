"use strict";

/**
 * Reference: https://d3js.org/
 */

var t = d3.transition().duration(1550).ease(d3.easeLinear);

var mydata = [12, 24, 36, 48, 52, 64, 72];

// All body, apply transition, towards a new background color
d3.select("body").transition(t).style("background-color", "#88cc88");

// Styling...
var p = d3.select("#wrapper").selectAll("p").data(mydata).enter().append("p").text(function (d) {
  return "font-size = " + d;
}).transition(t).style("color", "white").transition(t).style("background-color", function () {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
}).transition(t).style("font-size", function (d) {
  return d + "px";
});
//# sourceMappingURL=001_select_p.js.map