const dropdown = document.getElementById("myDropdown");

CollectData();
async function CollectData() {
  let totalData = await processData();
  let sortedData = GetTeamNames(totalData);
  //console.log(sortedData);

  sortedData.forEach((option) => {
    // Create a new option element for each item in the array
    const optionElement = document.createElement("option");

    // Set the text content of the option element
    optionElement.textContent = option;

    // Optionally, set a value attribute for the option (useful for form submissions)
    optionElement.value = option;

    // Append the option element to the dropdown
    dropdown.appendChild(optionElement);
  });

  dropdown.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    //console.log(typeof selectedOption);
    ChangeTeam(totalData, selectedOption);
  });
}
