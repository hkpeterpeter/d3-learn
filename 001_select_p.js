const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();

var t = d3.transition()
    .duration(1550)
    .ease(d3.easeLinear);

// All body, apply transition, towards a new background color
d3.select("body").transition(t).style("background-color", "#88cc88");

// Styling...
let p = d3.select("body")
     .selectAll("p")
    .data([12,24,36,48,52,64])
    .text( d => "font-size = " + d);

p.transition(t)
    .style("color", "white")
    .transition(t)
    .style("background-color", () => "hsl(" + Math.random() * 360 + ",100%,50%)" )
    .transition(t)
    .style("font-size", d => d+"px" );





