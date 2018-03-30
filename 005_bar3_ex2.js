/**
 * Reference:  https://bl.ocks.org/mbostock/3885304
 */


const svgWidth = 960;
const svgHeight = 500;

const svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

const margin = {top: 20, right: 20, bottom: 30, left: 40};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;


const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

const y = d3.scaleLinear().range([height, 0]);

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.tsv("tsv/data_005_bar3_ex2.tsv", d => {
    d.frequency = +d.frequency;
    return d;

}).then(data => {

    x.domain( data.map (d => d.letter ) ) ;
    y.domain( [0, d3.max(data, d => d.frequency)] );

    // Draw the x-axis using call + d3.axisBottom
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Draw the y-axis
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10,"%"));

    // Draw the bars

    const bar = g.selectAll(".bar")
        .data(data)
        .enter()
        .append("g");

    bar.append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.letter))
        .attr("y", d => y(d.frequency))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.frequency));




});