CollectDataForVis3();

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  console.log(this.value);
};

async function CollectDataForVis3() {
  let totalData = await processData();
  let sortedData = ArrangeData(totalData);
  CreateVis3(sortedData, 37);
}

function ArrangeData(data) {
  let sortedData = data.map((d, i) => {
    return {
      name: d.name,
      points: d.gameweekOutcomes.map((d, i) => {
        return d;
      }),
    };
  });
  return sortedData;
}

/*function CreateVis3(dataset) {
  console.log(dataset);
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1000 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(".third")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var circles = svg
    .selectAll("cheese")
    .data(dataset)
    .enter()
    .append("g")
    .selectAll("circle")
    .data((d) => {
      return d.endPoints;
    })
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("cx", (d) => {
      let pos = d[0] * 20;
      return pos;
    })
    .attr("cy", (d) => {
      let pos = parseInt(d[1]) * 15;
      return height - pos;
    });

  svg
    .selectAll("myText")
    .data(dataset)
    .enter()
    .append("g")
    .append("text")
    .text((d) => {
      return d.name;
    })
    .attr("x", 800)
    .attr("y", (d) => {
      var pos = d.endPoints[37][1] * 15;
      return height - pos;
    });
}*/

function CreateVis3(dataset, index) {
  var margin = 10,
    width = 1000 - 2 * margin,
    height = 1600 - 2 * margin;

  const pack = d3
    .pack()
    .size([width - margin, height - margin])
    .padding(5);

  // Create the hierarchy from the data
  const hierarchy = d3.hierarchy({ children: dataset }).sum((d) => d.points);

  // Compute the pack layout
  const root = pack(hierarchy);

  const svg = d3.select(".third").attr("width", width).attr("height", height);

  const bubbles = svg
    .selectAll(".bubble")
    .data(root.descendants().slice(1))
    .enter()
    .append("g")
    .attr("class", "bubble");

  bubbles.append("circle");
}
