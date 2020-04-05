d3.select("body").append("div")
  .style("border", "1px black solid")
  .html("hello world");

d3.select("div")
  .style("background-color", "pink")
  .style("font-size", "24px")
  .attr("id", "newDiv")
  .attr("class", "d3div")
  .on("click", () => {console.log("I have been clicked")});

d3.select("svg")
.append("line")
.attr("x1", 20)
.attr("y1", 20)
.attr("x2", 400)
.attr("y2", 400)
.style("stroke", "black")
.style("stroke-width", "2px");

d3.select("svg")
.append("text")
.attr("id", "a")
.attr("x", 20)
.attr("y", 20)
.style("opacity", 0)
.text("hello world");

d3.select("svg")
.append("circle")
.attr("r", 20)
.attr("cx", 20)
.attr("cy", 20)
.style("fill", "red");

d3.select("#a").transition().delay(1000).style("opacity", 1); // instant
d3.selectAll("#a").transition().duration(2000).style("opacity", 0); // gradual

d3.selectAll("circle").transition().duration(2000).attr("cy", 200);
