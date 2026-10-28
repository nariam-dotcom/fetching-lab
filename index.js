// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!


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
    const item = document.createElement("li");
    item.textContent =
      alert.properties.headline || "No headline available";
    alertList.appendChild(item);
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
    stateInput.value = "";
    return;
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayAlerts(data);
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");
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
