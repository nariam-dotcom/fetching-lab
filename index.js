// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

function fetchWeatherAlerts(state) {
  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Weather alerts:", data);
    })
    .catch(error => {
      console.log("Failed to fetch weather alerts:", error.message);
    });
}

// Test the function with a US state abbreviation
fetchWeatherAlerts("CA");


const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);


  const alertList = document.createElement("ul");

  data.features.forEach(alert => {
    const listItem = document.createElement("li");
    listItem.textContent =
      alert.properties.headline || "No headline available";

    alertList.appendChild(listItem);
  });

  alertsDisplay.appendChild(alertList);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function fetchWeatherAlerts(state) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  if (!state) {
    showError("Please enter a state abbreviation.");
    return;
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    showError("Please enter a valid two-letter state abbreviation.");
    return;
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      displayAlerts(data);
    })
    .catch(error => {
      showError(error.message);
    })
    .finally(() => {
      stateInput.value = "";
    });
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});
