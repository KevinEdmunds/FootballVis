//processData();

// Process the matchData as needed
async function processData() {
  let matchData = await fetchData();
  let awayTeams = createAwayTeams(matchData);
  let visData = fetchTeamStats(awayTeams, matchData);
  //console.log(visData);
  return visData;
}

//cycles through each team and fetches its stats from the matchData, adding it to an array of teams
function fetchTeamStats(awayTeams, matchData) {
  let visData = [];
  awayTeams.forEach((name) => {
    let team = createTeamData(name, matchData);
    visData.push(team);
  });
  return visData;
}
//Create an array of unique team names from each match in the season
function createAwayTeams(matchData) {
  let awayTeams = [];
  matchData.forEach((match) => {
    if (!awayTeams.includes(match.away_team.away_team_name)) {
      awayTeams.push(match.away_team.away_team_name);
    }
  });
  awayTeams.sort();
  return awayTeams;
}

//create a team object for each team with (hopefully) all of the data that is needed for visualizations
function createTeamData(teamName, matchData) {
  let team = {
    name: teamName,
    wins: {
      home: getGameOutcome(teamName, true, matchData, "win"),
      away: getGameOutcome(teamName, false, matchData, "win"),
      get total() {
        return this.home + this.away;
      },
    },
    draws: {
      home: getGameOutcome(teamName, true, matchData, "draw"),
      away: getGameOutcome(teamName, false, matchData, "draw"),
      get total() {
        return this.home + this.away;
      },
    },
    losses: {
      home: getGameOutcome(teamName, true, matchData, "lose"),
      away: getGameOutcome(teamName, false, matchData, "lose"),
      get total() {
        return this.home + this.away;
      },
    },
    goals: {
      scored: {
        home: getGoalsScored(teamName, true, matchData, "scored"),
        away: getGoalsScored(teamName, false, matchData, "scored"),
        get total() {
          return this.home + this.away;
        },
      },
      conceded: getGoalsScored(teamName, true, matchData, "conceded"),
      get difference() {
        return this.scored.total - this.conceded;
      },
    },
    gameweekOutcomes: gameweekOutcomes(teamName, matchData),
  };

  return team;
}

//fetches the goals scored by a team or their opponent by finding all home and away games
function getGoalsScored(name, home, matchData, condition) {
  let homeScore = 0;
  let awayScore = 0;
  let oppositionScore = 0;
  matchData.forEach((match) => {
    if (match.away_team.away_team_name == name) {
      awayScore += match.away_score;
      oppositionScore += match.home_score;
    } else if (match.home_team.home_team_name == name) {
      homeScore += match.home_score;
      oppositionScore += match.away_score;
    }
  });

  if (home & (condition == "scored")) {
    return homeScore;
  } else if (!home & (condition == "scored")) {
    return awayScore;
  } else if ((condition = "conceded")) {
    return oppositionScore;
  }
}

//generates values for a teams home/away w/l/d and returns accordingly
function getGameOutcome(name, home, matchData, condition) {
  let teamHomeWins = 0;
  let teamAwayWins = 0;
  let teamHomeLosses = 0;
  let teamAwayLosses = 0;
  let teamHomeDraws = 0;
  let teamAwayDraws = 0;
  matchData.forEach((match) => {
    if (match.away_team.away_team_name == name) {
      if (match.away_score > match.home_score) {
        teamAwayWins += 1;
      } else if (match.away_score == match.home_score) {
        teamAwayDraws += 1;
      } else if (match.away_score < match.home_score) {
        teamAwayLosses += 1;
      }
    } else if (match.home_team.home_team_name == name) {
      if (match.away_score > match.home_score) {
        teamHomeLosses += 1;
      } else if (match.away_score == match.home_score) {
        teamHomeDraws += 1;
      } else if (match.away_score < match.home_score) {
        teamHomeWins += 1;
      }
    }
  });
  if (home & (condition == "win")) {
    return teamHomeWins;
  } else if (!home & (condition == "win")) {
    return teamAwayWins;
  } else if (home & (condition == "draw")) {
    return teamHomeDraws;
  } else if (!home & (condition == "draw")) {
    return teamAwayDraws;
  } else if (home & (condition == "lose")) {
    return teamHomeLosses;
  } else if (!home & (condition == "lose")) {
    return teamAwayLosses;
  }
}

//creates a sorted array of the outcomes of each game for a team from the first to the last game
function gameweekOutcomes(name, matchData) {
  let outcomes = [];
  let matchWeek = 1;

  for (i = 1; i <= 38; i++) {
    matchData.forEach((match) => {
      let isTeamPlaying = false;
      let weekData = match.match_week;
      if (i == weekData) {
        isTeamPlaying =
          match.home_team.home_team_name === name ||
          match.away_team.away_team_name === name;
        if (isTeamPlaying) {
          const outcome = determineOutcome(match, name);
          outcomes.push(outcome);
        }
      }
    });
  }
  let gameweekPoints = getGameweekPoints(outcomes);
  return gameweekPoints;
}

//uses the array from gameweekOutcomes() and converts it to points gained over each game for the season
function getGameweekPoints(outcomes) {
  let points = [0];
  let totalPoints = 0;
  outcomes.forEach((game) => {
    if (game == "win") {
      points.push(points[points.length - 1] + 3);
    } else if (game == "loss") {
      points.push(points[points.length - 1]);
    } else {
      points.push(points[points.length - 1] + 1);
    }
  });
  points.shift();
  return points;
}

// Helper function to determine the match outcome
function determineOutcome(match, name) {
  if (match.home_score > match.away_score) {
    return match.home_team.home_team_name === name ? "win" : "loss";
  } else if (match.home_score < match.away_score) {
    return match.away_team.away_team_name === name ? "win" : "loss";
  } else {
    return "draw";
  }
}
