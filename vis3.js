CollectDataForVis3();
//CreateVis3();

async function CollectDataForVis3() {
  let totalData = await processData();
  //console.log(totalData);
  let sortedData = ArrangeData(totalData);
  console.log(sortedData);
  CreateVis3(sortedData);
}

function ArrangeData(data) {
  let sortedData = data.map((d) => {
    return { name: d.name, endPoints: d.gameweekOutcomes };
  });
  return sortedData;
}

function CreateVis3(dataset) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(".third")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //console.log(dataset[1].endPoints);

  var circles = svg
    .selectAll("cheese")
    .data(dataset)
    .enter()
    .append("g")
    .selectAll("circle")
    .data((d) => {
      console.log(d.endPoints);
      return d.endPoints;
    })
    .enter()
    .append("circle")
    .attr("r", 2)
    .attr("cx", (d, i) => {
      let pos = i * 20;
      return pos;
    })
    .attr("cy", (d) => {
      let pos = d * 10;
      return height - pos;
    });
}
