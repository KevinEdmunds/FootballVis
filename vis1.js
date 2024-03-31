//Bar graph with home/away wins from each team

collectData("home");

homeFilter = document.getElementById("homeFilter");
awayFilter = document.getElementById("awayFilter");

let width = 1000;
let height = 400;
let margin = 100;
let yScale;
let xScale;

async function collectData(home) {
  let totalData = await processData();

  let sortedData = getWinsArray(totalData, home);
  let svg;

  BuildVisualization(sortedData, svg);
}

function getWinsArray(totalData, winType) {
  let totalWins;

  winArray = totalData.map((data) => {
    totalWins = data.wins.home + data.wins.away;
    return { name: data.name, wins: totalWins };
  });

  return winArray;
}

function BuildVisualization(sortedData, svg) {
  let data;
  svg = CreateSVG();
  let xScale = CreateXScale(sortedData, svg);
  let yScale = CreateYScale(sortedData, svg);
  data = sortedData;

  PutItAllTogether(svg, xScale, yScale, data);

  UpdateData(svg, xScale, yScale, data);
}
function CreateSVG() {
  let svg = d3
    .select(".first")
    .append("svg")
    .attr("width", width + margin + margin)
    .attr("height", height + margin + margin)
    .append("g")
    .attr("transform", `translate(${margin},${margin})`);
  return svg;
}
function CreateYScale(data, svg) {
  yScale = d3.scaleLinear().domain([0, 25]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(yScale));
  return yScale;
}
function CreateXScale(data, svg) {
  xScale = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .range([0, width])
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  return xScale;
}
function PutItAllTogether(svg, xScale, yScale, data) {
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
}
function UpdateData(svg, xScale, yScale, data) {
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.name);
    })
    .attr("y", function (d) {
      return yScale(d.wins);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d.wins);
    })
    .attr("fill", "#e21017");
}
