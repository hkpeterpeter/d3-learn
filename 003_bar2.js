/**
 * Reference: https://bost.ocks.org/mike/bar/2/
 */

let data = [4, 8, 15, 16, 23, 42];

const width = 800;
const height = 600;
const barHeight = 20;

let x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

/* The wrapper: chart */

let chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

const bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);


bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });


bar.append("text")
    .attr("x", "1em" )
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text( "" + 0 );

