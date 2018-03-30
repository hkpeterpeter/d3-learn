"use strict";

/**
 * Reference: https://bost.ocks.org/mike/circles/
 */

document.getElementById("btnSelectElements").onclick = function (e) {

    d3.select("svg").selectAll("circle").style("fill", "steelblue").attr("r", 30);
};

document.getElementById("btnRandPosition").onclick = function (e) {

    d3.select("svg").selectAll("circle").attr("cx", function () {
        return Math.random() * 720;
    });
};

document.getElementById("btnBindingData").onclick = function (e) {
    // binding data
    d3.select("svg").selectAll("circle").data([32, 57, 112]).attr("r", function (d) {
        return Math.sqrt(d);
    }).attr("cx", function (d, i) {
        return i * 100 + 30;
    });
};

document.getElementById("btnEnterElements").onclick = function (e) {

    d3.select("svg").selectAll("circle").data([32, 57, 112, 293]).enter().append("circle").attr("cy", 60).attr("r", function (d) {
        return Math.sqrt(d);
    }).attr("cx", function (d, i) {
        return i * 100 + 30;
    }).merge(circle); // breaking change since v4.0
};

document.getElementById("btnRemoveElements").onclick = function (e) {
    d3.select("svg").selectAll("circle").data([32, 57]).exit().remove();
};

document.getElementById("btnGeneralPattern").onclick = function (e) {

    // The general pattern:
    var num = Math.floor(Math.random() * 10) + 2; // 2..11
    var data = [];
    for (var i = 0; i < num; i++) {
        data.push(Math.floor(Math.random() * 100));
    } // Data binding
    var circle = d3.select("svg").selectAll("circle").data(data, function (d) {
        return d;
    });

    // Handling data addition
    circle.enter().append("circle").attr("cy", 60).attr("r", function (d) {
        return Math.sqrt(d);
    }).attr("cx", function (d, i) {
        return i * 100 + 30;
    }).merge(circle); // breaking change since v4.0

    // Handling data removal
    circle.exit().remove();
};
//# sourceMappingURL=006_3circles.js.map