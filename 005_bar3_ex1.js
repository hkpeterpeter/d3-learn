/**
 * Reference: https://bost.ocks.org/mike/bar/3/
 */

const width = 960;
const height = 500;


const chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

const y = d3.scaleLinear()
    .range([height, 0]);

d3.tsv("tsv/data_005_bar3_ex1.tsv", d => {

    d.value = +d.value; // text => value
    return d;

}).then( data => {

    // set the data domain
    //  [0 ... max data value]
    y.domain([0, d3.max(data, d => d.value)]);

    console.log(data);
    const barWidth = width / data.length;
    const bar = chart.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        //.attr("transform", (d,i)=> "translate(" + i * barWidth + ",0)");

    bar.append("rect")
        .attr("x", (d,i) => i*barWidth)
        .attr("y", d =>  y(d.value))
        .attr("height", d => height - y(d.value))
        .attr("width", barWidth-1);


    bar.append("text")
        .attr("x", (d,i) => i*barWidth + barWidth/2)
        .attr("y", d => y(d.value) + 3)
        .attr("dy", ".75em")
        .text( d => d.value );

});
