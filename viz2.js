CollectDataForVis2();

async function CollectDataForVis2() {
  let totalData = await processData();
  SortByHomeOrAway(totalData);
  //console.log(totalData);
  GetTeamNames(totalData);
  GetStatsForSpecTeam(totalData, "Arsenal");
  CreateVis2(totalData);
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

/*----------------------------------------------sectiion being worked on -----------------------------------*/

/*
function GetStatsForSpecTeam(data, name) {
  let sortedData;

  let index=>{}


  function FindIndex()
  {
    for (i = 0; i < data.length; i++) {
      if (data[i].name == name) {
        return i;
      }
    }
  }

  sortedData = data.map((team) => {
    if (team.name == name) {
      return {
        teamName: team.name, // Team name for display
        matches: [
          {
            location: "Home Wins",
            result: team.wins.home,
          },
          {
            location: "Home Draws",
            result: team.draws.home,
          },
          {
            location: "Home Losses",
            result: team.losses.home,
          },
          {
            location: "Away Wins",
            result: team.wins.away,
          },
          {
            location: "Away Draws",
            result: team.draws.away,
          },
          {
            location: "Away Losses",
            result: team.losses.away,
          },
        ],
      };
    }
  });
  console.log(sortedData);
}*/

function GetTeamNames(data) {
  let sortedData;
  sortedData = data.map((team) => {
    return team.name;
  }); //console.log(sortedData);
}

function CreateVis2(data) {
  //dimensions
  var margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  //Create SVG
  var svg = d3
    .select(".second")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis
  var x = d3.scaleLinear().domain([0, 13000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d) {
        return d.Country;
      })
    )
    .padding(0.1);
  svg.append("g").call(d3.axisLeft(y));

  //Bars
  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.Country);
    })
    .attr("width", function (d) {
      return x(d.Value);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");
}
