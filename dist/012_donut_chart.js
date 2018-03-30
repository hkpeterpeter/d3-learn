"use strict";

/**
 * Reference: https://bl.ocks.org/mbostock/3887193
 *
 * Basically, the same as piechart, except the path
 */

var svgWidth = 960;
var svgHeight = 500;

var svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var radius = Math.min(width, height) / 2;
var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie().sort(null).value(function (d) {
    return d.population;
});

var path = d3.arc()
//.outerRadius(radius - 10)
//.innerRadius(0);
.outerRadius(radius - 10).innerRadius(radius - 70);

var label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

d3.csv("tsv/data_011_piechart.csv", function (d) {

    d.population = +d.population;
    return d;
}).then(function (data) {

    var arc = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

    arc.append("path").attr("d", path).attr("fill", function (d) {
        return color(d.data.age);
    });

    arc.append("text").attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    }).attr("dy", "0.35em").text(function (d) {
        return d.data.age;
    });
});
//# sourceMappingURL=012_donut_chart.js.map