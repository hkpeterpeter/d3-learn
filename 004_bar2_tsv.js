/**
 * Reference: https://bost.ocks.org/mike/bar/2/
 * Note #1: tsv use Promise to load data
 *
 */



const width = 800;
const barHeight = 30;
const height = 600;

const x = d3.scaleLinear()
    .range([0,width]);

/* The wrapper: chart */
const chart = d3.select(".chart")
    .attr("width", width);
    // .attr("height", height);


/**
 * Note #1
 */
d3.tsv("tsv/data_004_bar2_tsv.tsv", type).then( data => {
    console.log(data);

    x.domain([0, d3.max( data, d => d.value )]);
    chart.attr("height", barHeight * data.length);

    const bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", (d,i) => "translate(0," + i * barHeight + ")" );

    bar.append("rect")
        .attr("width", d => x(d.value) )
        .attr("height", barHeight-1);

    bar.append("text")
        .attr("x",  d => x(d.value) - 3 )
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text( d => d.value );

    bar.append("text")
        .attr("x", "6em" )
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text( d => d.name  );


});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}