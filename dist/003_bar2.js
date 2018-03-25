"use strict";

/**
 * Reference: https://bost.ocks.org/mike/bar/2/
 */

var data = [4, 8, 15, 16, 23, 42];

var width = 800;
var height = 600;
var barHeight = 20;

var x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, width]);

/* The wrapper: chart */

var chart = d3.select(".chart").attr("width", width).attr("height", height);

var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function (d, i) {
    return "translate(0," + i * barHeight + ")";
});

bar.append("rect").attr("width", x).attr("height", barHeight - 1);

bar.append("text").attr("x", function (d) {
    return x(d) - 3;
}).attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
    return d;
});

bar.append("text").attr("x", "1em").attr("y", barHeight / 2).attr("dy", ".35em").text("" + 0);

/*
d3.tsv("data.tsv", (error, data) => {

    //console.log(data);
    //console.log(typeof data);
    // console.log(data.length);
});
*/
//# sourceMappingURL=003_bar2.js.map