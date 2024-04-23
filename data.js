let type = "matches";
let competition = "2";
let season = "27";

let url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/${type}/${competition}/${season}.json`;

async function fetchData() {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let matchData = await response.json();
    return matchData;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

async function main() {
  try {
    let matchData = await fetchData();
  } catch (error) {
    // Handle any errors that occurred during the matchData retrieval
    console.error("Data retrieval error:", error);
  }
}

main();
