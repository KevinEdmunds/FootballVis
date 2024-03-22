//Bar graph with home/away wins from each team

collectData("home");

homeFilter = document.getElementById("homeFilter");
awayFilter = document.getElementById("awayFilter");

let width = 800;
let height = 600;
let margin = 100;
let yScale;
let xScale;

async function collectData(home) {
  let totalData = await processData();

  let homeData = getWinsArray(totalData, home);
  let awayData = getWinsArray(totalData, "away");

  //console.log(homeData);
  let svg;

  //  makeVis(homeData, awayData);
  BuildVisualization(homeData, awayData, svg);
  return "cheese";
}

function getWinsArray(totalData, winType) {
  if (winType == "home") {
    winArray = totalData.map((data) => {
      return { name: data.name, wins: data.wins.home };
    });
  } else {
    winArray = totalData.map((data) => {
      return { name: data.name, wins: data.wins.away };
    });
  }
  return winArray;
}

function BuildVisualization(homeData, awayData, svg) {
  let data;
  svg = CreateSVG();
  let xScale = CreateXScale(homeData, svg);
  let yScale = CreateYScale(homeData, svg);
  PutItAllTogether(svg, xScale, yScale, data);

  homeFilter.addEventListener("click", function () {
    data = homeData;
    UpdateData(svg, xScale, yScale, data);
  });
  awayFilter.addEventListener("click", function () {
    data = awayData;
    UpdateData(svg, xScale, yScale, data);
  });
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
  yScale = d3.scaleLinear().domain([0, 19]).range([height, 0]);
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
    .attr("fill", "#69b3a2");
}
