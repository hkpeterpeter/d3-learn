/**
 * Reference: https://bl.ocks.org/mbostock/3887051
 */



const svgWidth = 960;
const svgHeight = 500;
const svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

const x1 = d3.scaleBand()
    .padding(0.05);


const y = d3.scaleLinear()
    .rangeRound([height, 0]);

const z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"
        , "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("tsv/data_007_groupedbar.csv", (d,i, columns) => {

    for (let i=1, n = columns.length; i<n; ++i )
        d[columns[i]] = +d[columns[i]];
    return d;


}).then( data => {

    console.log(data);


    const keys = data.columns.slice(1); // Getting the keys, starting from column 1

    console.log(keys);

    /*
    function mytest(d) {
        return keys.map(key => ({key:key, value: d[key]}) );
    }
    console.log(mytest(data[0]));
    console.log(mytest(data[1]));
    */

    x0.domain(data.map(d => d.State));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    console.log("x0.bandwidth() = " + x0.bandwidth());

    y.domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice();

    // Draw the bars here..
    g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", d => "translate(" + x0(d.State) + ",0)" )
        .selectAll("rect")
        .data( d => keys.map(key => ({key:key,value:d[key]})) )
        .enter().append("rect")
        .attr("x", d => x1(d.key) )
        .attr("y", d => y(d.value) )
        .attr("width", x1.bandwidth())
        .attr("height", d => height - y(d.value) )
        .attr("fill", d => z(d.key) );


    // Draw the x-axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

    // Draw the y-axis
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Population");

    // Legend (top-right corner)
    const legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.reverse())
        .enter().append("g")
        .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);







});
