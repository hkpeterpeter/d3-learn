/**
 * Reference: https://bost.ocks.org/mike/circles/
 */


document.getElementById("btnSelectElements").onclick = e => {

    d3.select("svg").selectAll("circle").style("fill", "steelblue")
        .attr("r", 30);
}


document.getElementById("btnRandPosition").onclick = e => {

    d3.select("svg").selectAll("circle").attr("cx", () =>  Math.random() * 720 );
}

document.getElementById("btnBindingData").onclick = e => {
    // binding data
    d3.select("svg").selectAll("circle")
        .data([32, 57,112])
        .attr("r", d => Math.sqrt(d))
        .attr("cx", (d,i) => i * 100 + 30);
}

document.getElementById("btnEnterElements").onclick = e => {


    d3.select("svg").selectAll("circle")
        .data([32,57,112,293])
        .enter().append("circle")
        .attr("cy", 60)
        .attr("r", d => Math.sqrt (d))
        .attr("cx", (d,i) => i * 100 + 30)
            .merge(circle);   // breaking change since v4.0

}

document.getElementById("btnRemoveElements").onclick = e => {
    d3.select("svg").selectAll("circle")
        .data([32,57])
        .exit()
        .remove();
}

document.getElementById("btnGeneralPattern").onclick = e => {

    // The general pattern:
    const num = Math.floor(Math.random() * 4) + 2; // 2..5
    const data = [];
    for (let i = 0; i<num; i++)
        data.push(  Math.floor(Math.random() * 100)  );

    // Data binding
    const circle = d3.select("svg").selectAll("circle")
        .data(data, d => d );

    // Handling data addition
    circle.enter().append("circle")
        .attr("cy", 60)
        .attr("cx", (d,i) => i * 100 + 30)

        .merge(circle)  // breaking change since v4.0
        .attr("r", 0)
        .transition()
        .attr("r", d => Math.sqrt(d))

    // Handling data removal
    circle.exit()
        .transition()
        .attr("r", 0)
        .remove();


}