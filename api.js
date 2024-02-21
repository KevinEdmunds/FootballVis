/*let height = 600;
width = 600;
margin = 50;

let svg = d3
  .select(".first")
  .append("svg")
  .attr("width", width + margin + margin)
  .attr("height", height + margin + margin)
  .append("g")
  .attr("transform", `translate(${margin},${margin})`);

let xScale = d3.scaleLinear().domain([0, 4000]).range([0, width]);
function createXAxis(data) {
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));
}

let yScale = d3.scaleLinear().domain([0, 500000]).range([height, 0]);
function createYAxis() {
  svg.append("g").call(d3.axisLeft(yScale));
}

function createCircles(data) {
  svg
    .selectAll(".circles")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.GrLivArea))
    .attr("cy", (d) => yScale(d.SalePrice))
    .attr("r", 5)
    .style("fill", "steelblue");
}

d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
).then(function (data) {
  createXAxis(data);
  createYAxis();
  createCircles(data);
});
*/
