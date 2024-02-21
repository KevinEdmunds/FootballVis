/*let Height = 500;
Width = 720;
Margin = { top: 50, right: 50, bottom: 50, left: 60 };

let Svg = d3
  .select(".second")
  .append("svg")
  .attr("Height", Height + Margin.top + Margin.bottom)
  .attr("Width", Width + Margin.left + Margin.right)
  .append("g")
  .attr("transform", `translate(${Margin.left},${Margin.top})`);

let timeScale = d3.timeParse("%Y-%m-%d");

let XScale = d3.scaleTime().range([0, Width]);
function createXaxis(Data) {
  XScale.domain(d3.extent(Data, (Data) => timeScale(Data.date)));
  Svg.append("g")
    .attr("transform", `translate(0,${Height})`)
    .call(d3.axisBottom(XScale).ticks(10))
    .call((g) => {
      g.append("text")
        .attr("x", Width / 2)
        .attr("y", Margin.bottom)
        .attr("fill", "currentColor")
        .text("Date");
    });
}

let YScale = d3.scaleLinear().range([Height, 0]);
function createYaxis(Data) {
  YScale.domain([0, d3.max(Data, (Data) => Math.floor(Data.close))]);
  Svg.append("g").call(d3.axisLeft(YScale));
}

let line = d3
  .line()
  .x((Data) => XScale(timeScale(Data.date)))
  .y((Data) => YScale(Data.close));

function createLine(Data) {
  Svg.append("path")
    .datum(Data)
    .attr("d", line)
    .attr("stroke", "red")
    .attr("stroke-Width", 3)
    .attr("fill", "none");
}

d3.csv("/aapl.csv").then((Data) => {
  createXaxis(Data);
  createYaxis(Data);
  createLine(Data);
});
*/
