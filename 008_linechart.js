/**
 *
 * Reference: https://bl.ocks.org/mbostock/3883245
 */

const svgWidth = 960;
const svgHeight = 500;

const svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const parseTime = d3.timeParse("%d-%b-%y");
const x = d3.scaleTime()
        .rangeRound([0,width]);

const y = d3.scaleLinear()
        .rangeRound([height, 0]);

const line = d3.line()
        .x( d => x(d.date))
        .y( d => y(d.close));


d3.tsv("tsv/data_008_linechart.tsv", d => {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}).then( data => {
    //console.log(data);

    // returns the minimum and maximum value in the given array
    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.close));

    
    // x-axis
    //let xAxis = d3.axisBottom(x).ticks(15);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))  // use .tick(value) to control the ticks..
        .select(".domain")  // remove the lines...
        .remove();

    // y-axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(5)) // controls the number of ticks
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    // line data values

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line); // define d3 line function and use it here..






});