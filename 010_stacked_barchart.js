/*
*  Reference: https://bl.ocks.org/mbostock/3886208
*
* */

const svgWidth = 960;
const svgHeight = 500;

const svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const x = d3.scaleBand()
    .rangeRound([0,width])
    .paddingInner(0.05)
    .align(0.1);

const y = d3.scaleLinear()
    .rangeRound([height, 0]);

const z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b",
        "#a05d56", "#d0743c", "#ff8c00"]);


d3.csv("tsv/data_010_stacked_barchart.csv", (d,i,columns) => {

    var i = 1;
    var t = 0;
    for (; i < columns.length; ++i)
        t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;

}).then( data => {

    const keys = data.columns.slice(1); // ignore the first item

    x.domain( data.map ( d => d.State ));
    y.domain([0, d3.max(data, d => d.total )]).nice();
    z.domain(keys);

    //console.log( data) ;
    //console.log( keys) ;
    //console.log( d3.stack().keys(keys)(data) );

    // stacked bars
    g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", d => z(d.key) )
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x",  d => x(d.data.State) )
        .attr("y", d => y(d[1]) )
        .attr("height", d => y(d[0]) - y(d[1]) )
        .attr("width", x.bandwidth());


    // x-axis
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();
    
    // y-axis
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"));

    // legend
    const legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
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


