/**
 * Reference: https://bl.ocks.org/mbostock/3887193
 *
 * Basically, the same as piechart, except the path
 */

const svgWidth = 960;
const svgHeight = 500;

const svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const radius = Math.min(width, height) / 2;
const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888",
    "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


const pie = d3.pie()
    .sort(null)
    .value(d => d.population);

const path = d3.arc()
    //.outerRadius(radius - 10)
    //.innerRadius(0);
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);


const label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);



d3.csv("tsv/data_011_piechart.csv", d => {

    d.population = +d.population;
    return d;

}).then ( data => {

    const arc = g.selectAll(".arc")
        .data( pie(data) )
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", d => color(d.data.age) );

    arc.append("text")
        .attr("transform", d => "translate(" + label.centroid(d) + ")" )
        .attr("dy", "0.35em")
        .text( d => d.data.age );

});