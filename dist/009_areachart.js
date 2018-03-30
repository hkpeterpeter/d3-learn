"use strict";

/**
 *
 * Reference: hhttps://bl.ocks.org/mbostock/3883195
 */

var svgWidth = 960;
var svgHeight = 500;

var svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");
var x = d3.scaleTime().rangeRound([0, width]);

var y = d3.scaleLinear().rangeRound([height, 0]);

/*const line = d3.line()
        .x( d => x(d.date))
        .y( d => y(d.close));*/

var area = d3.area().x(function (d) {
    return x(d.date);
}).y1(function (d) {
    return y(d.close);
});

d3.tsv("tsv/data_008_linechart.tsv", function (d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}).then(function (data) {
    //console.log(data);

    // returns the minimum and maximum value in the given array
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain(d3.extent(data, function (d) {
        return d.close;
    }));

    // area.y0 = minimum value of d.close
    area.y0(y(d3.min(data, function (d) {
        return d.close;
    })));

    // alternatively:
    //  y.domain( [0, d3.max(data, d => d.close)] )
    //  area.y0( y(0) )

    // x-axis
    //let xAxis = d3.axisBottom(x).ticks(15);

    g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)) // use .tick(value) to control the ticks..
    .select(".domain") // remove the lines...
    .remove();

    // y-axis
    g.append("g").call(d3.axisLeft(y).ticks(5)) // controls the number of ticks
    .append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Price ($)");

    // line data values

    g.append("path").datum(data).attr("fill", "steelblue")
    //.attr("stroke", "steelblue")
    //.attr("stroke-linejoin", "round")
    //.attr("stroke-linecap", "round")
    //.attr("stroke-width", 1.5)
    .attr("d", area); // use the area function here..

});
//# sourceMappingURL=009_areachart.js.map