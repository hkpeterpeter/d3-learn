"use strict";

/**
 Reference: https://bost.ocks.org/mike/bar
 Note #1:  scaleLinear() should be used for a 4+ version
 */

var data = [14, 8, 15, 16, 23, 42, 99, 84, 32, 77];

/**
 * Short hand of the followings:
 *
 * var chart = d3.select(".chart");
 * var bar = chart.selectAll("div");
 * var barUpdate = bar.data(data);
 * var barEnter = barUpdate.enter().append("div")
 *
 * barEnter.style("width", d => d * 10 + "px");
 * barEnter.text("width", d => d );
 *
 */

/**
 * Solve the magic number 10
 * Note #1
 */
var x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, 420]);

d3.select(".chart").selectAll("div").data(data).enter().append("div")
//.style("width", d => d * 10 + "px")
.style("width", function (d) {
  return x(d) + "px";
}).text(function (d) {
  return d;
})
// some effect to show random colors
.transition().duration(1000).style("background-color", function () {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
//# sourceMappingURL=002_bar1.js.map