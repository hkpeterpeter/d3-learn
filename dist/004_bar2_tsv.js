"use strict";

/**
 * Reference: https://bost.ocks.org/mike/bar/2/
 * Note #1: tsv use Promise to load data
 *
 */

var width = 800;
var barHeight = 30;
var height = 600;

var x = d3.scaleLinear().range([0, width]);

/* The wrapper: chart */
var chart = d3.select(".chart").attr("width", width);
// .attr("height", height);


/**
 * Note #1
 */
d3.tsv("data.tsv", type).then(function (data) {
    console.log(data);

    x.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);
    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g").data(data).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    });

    bar.append("rect").attr("width", function (d) {
        return x(d.value);
    }).attr("height", barHeight - 1);

    bar.append("text").attr("x", function (d) {
        return x(d.value) - 3;
    }).attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
        return d.value;
    });

    bar.append("text").attr("x", "6em").attr("y", barHeight / 2).attr("dy", ".35em").text(function (d) {
        return d.name;
    });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}
//# sourceMappingURL=004_bar2_tsv.js.map