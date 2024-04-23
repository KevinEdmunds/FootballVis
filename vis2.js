CollectDataForVis2();
//let create = CreateVis2();
let hasRun;
var marginVis2 = { top: 20, right: 30, bottom: 40, left: 90 },
  widthVis2 = 460 - marginVis2.left - marginVis2.right,
  heightVis2 = 400 - marginVis2.top - marginVis2.bottom;
var svg;
var x;
var y;
var u;

async function CollectDataForVis2() {
  let totalData = await processData();
  SortByHomeOrAway(totalData);
  //console.log(totalData);
  //GetTeamNames(totalData);
  let sortedData = GetStatsForSpecTeam(totalData, totalData[0].name);
  CreateVis2(sortedData);
}

function SortByHomeOrAway(data) {
  let sortedData;
  sortedData = data.map((team) => {
    return {
      name: team.name,
      home: {
        wins: team.wins.home,
        draws: team.draws.home,
        losses: team.losses.home,
      },
      away: {
        wins: team.wins.away,
        draws: team.draws.away,
        losses: team.losses.away,
      },
    };
  });
  //console.log(sortedData[0]);
  return sortedData;
}

function ChangeTeam(totalData, name) {
  let sortedData = GetStatsForSpecTeam(totalData, name);
  //console.log(sortedData);
  CreateVis2(sortedData);
}

function GetStatsForSpecTeam(data, name) {
  let sortedData;

  let index = GetIndex();
  function GetIndex() {
    {
      for (i = 0; i < data.length; i++) {
        if (data[i].name == name) {
          return i;
        }
      }
    }
  }

  sortedData = [
    {
      location: "Home Wins",
      result: data[index].wins.home,
    },
    {
      location: "Home Draws",
      result: data[index].draws.home,
    },
    {
      location: "Home Losses",
      result: data[index].losses.home,
    },
    {
      location: "Away Wins",
      result: data[index].wins.away,
    },
    {
      location: "Away Draws",
      result: data[index].draws.away,
    },
    {
      location: "Away Losses",
      result: data[index].losses.away,
    },
  ];
  //console.log(sortedData);
  return sortedData;
}

//A misc function that might maybebecome useful later on
function GetTeamNames(data) {
  let sortedData;
  sortedData = data.map((team) => {
    return team.name;
  }); //console.log(sortedData);
  return sortedData;
}

function CreateVis2(data) {
  if (hasRun) {
    UpdateVis(data, svg, x, y);
  } else {
    hasRun = true;

    //Create SVG
    svg = d3
      .select(".second")
      .append("svg")
      .attr("width", widthVis2 + marginVis2.left + marginVis2.right)
      .attr("height", heightVis2 + marginVis2.top + marginVis2.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + marginVis2.left + "," + marginVis2.top + ")"
      );

    // Add X axis

    // Y axis
    y = d3
      .scaleBand()
      .range([0, heightVis2])
      .domain(
        data.map(function (d) {
          return d.location;
        })
      )
      .padding(0.5);
    svg.append("g").call(d3.axisLeft(y));

    UpdateVis(data, svg, x, y);
  }

  function UpdateVis(data, svg, x, y) {
    svg.selectAll(".xAxis").remove();
    x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.result;
        }),
      ])
      .range([0, widthVis2]);

    svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + heightVis2 + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    u = svg.selectAll("rect").data(data);

    u.exit().remove();

    u.enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.location);
      })
      .attr("width", function (d) {
        return x(d.result);
      })
      .attr("height", y.bandwidth())
      .attr("fill", function (d) {
        if (d.location.split(" ").pop() == "Wins") {
          return "#94ffb2";
        } else if (d.location.split(" ").pop() == "Draws") {
          return "#f4ff94";
        } else if (d.location.split(" ").pop() == "Losses") {
          return "#ff9494";
        }
      });
  }
}
