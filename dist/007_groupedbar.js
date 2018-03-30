"use strict";

/**
 * Reference: https://bl.ocks.org/mbostock/3887051
 */

var svgWidth = 960;
var svgHeight = 500;
var svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

var margin = { top: 20, right: 20, bottom: 30, left: 40 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

var x1 = d3.scaleBand().padding(0.05);

var y = d3.scaleLinear().rangeRound([height, 0]);

var z = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("tsv/data_007_groupedbar.csv", function (d, i, columns) {

    for (var _i = 1, n = columns.length; _i < n; ++_i) {
        d[columns[_i]] = +d[columns[_i]];
    }return d;
}).then(function (data) {

    console.log(data);

    var keys = data.columns.slice(1); // Getting the keys, starting from column 1

    console.log(keys);

    /*
    function mytest(d) {
        return keys.map(key => ({key:key, value: d[key]}) );
    }
    console.log(mytest(data[0]));
    console.log(mytest(data[1]));
    */

    x0.domain(data.map(function (d) {
        return d.State;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    console.log("x0.bandwidth() = " + x0.bandwidth());

    y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (key) {
            return d[key];
        });
    })]).nice();

    // Draw the bars here..
    g.append("g").selectAll("g").data(data).enter().append("g").attr("transform", function (d) {
        return "translate(" + x0(d.State) + ",0)";
    }).selectAll("rect").data(function (d) {
        return keys.map(function (key) {
            return { key: key, value: d[key] };
        });
    }).enter().append("rect").attr("x", function (d) {
        return x1(d.key);
    }).attr("y", function (d) {
        return y(d.value);
    }).attr("width", x1.bandwidth()).attr("height", function (d) {
        return height - y(d.value);
    }).attr("fill", function (d) {
        return z(d.key);
    });

    // Draw the x-axis
    g.append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x0));

    // Draw the y-axis
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(null, "s")).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5).attr("dy", "0.32em").attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start").text("Population");

    // Legend (top-right corner)
    var legend = g.append("g").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(keys.reverse()).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
    });

    legend.append("rect").attr("x", width - 19).attr("width", 19).attr("height", 19).attr("fill", z);

    legend.append("text").attr("x", width - 24).attr("y", 9.5).attr("dy", "0.32em").text(function (d) {
        return d;
    });
});
//# sourceMappingURL=007_groupedbar.js.map