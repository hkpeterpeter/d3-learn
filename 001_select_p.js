/**
 * Reference: https://d3js.org/
 */

let t = d3.transition()
    .duration(1550)
    .ease(d3.easeLinear);

let mydata = [12,24,36,48,52,64,72];

// All body, apply transition, towards a new background color
d3.select("body").transition(t).style("background-color", "#88cc88");

// Styling...
let p = d3.select("#wrapper")
     .selectAll("p")
    .data(mydata)
    .enter().append("p")
    .text( d => "font-size = " + d)
    .transition(t)
    .style("color", "white")
    .transition(t)
    .style("background-color", () => "hsl(" + Math.random() * 360 + ",100%,50%)" )
    .transition(t)
    .style("font-size", d => d+"px" );









