"use strict";

/**
 * Reference: https://bost.ocks.org/mike/bar/3/
 */

var width = 960;
var height = 500;

var chart = d3.select(".chart").attr("width", width).attr("height", height);

var y = d3.scaleLinear().range([height, 0]);

d3.tsv("tsv/data_005_bar3_ex1.tsv", type).then(function (data) {

    // set the data domain
    //  [0 ... max data value]
    y.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

    console.log(data);
    var barWidth = width / data.length;
    var bar = chart.selectAll("g").data(data).enter().append("g");
    //.attr("transform", (d,i)=> "translate(" + i * barWidth + ",0)");

    bar.append("rect").attr("x", function (d, i) {
        return i * barWidth;
    }).attr("y", function (d) {
        return y(d.value);
    }).attr("height", function (d) {
        return height - y(d.value);
    }).attr("width", barWidth - 1);

    bar.append("text").attr("x", function (d, i) {
        return i * barWidth + barWidth / 2;
    }).attr("y", function (d) {
        return y(d.value) + 3;
    }).attr("dy", ".75em").text(function (d) {
        return d.value;
    });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}
//# sourceMappingURL=005_bar3_ex1.js.map