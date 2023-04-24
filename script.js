// Get elements from DOM

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistoryContainer = document.getElementById('search-history-container');

// Event listener for form submit
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value;
  // Call API to fetch weather data for the city
  fetchWeatherData(city);
});

// Function to fetch weather data from API
function fetchWeatherData(city) {
  // Call API and retrieve current and forecast weather data for the city
  // Update DOM with retrieved data using DOM manipulation
}

// Function to update current weather information in DOM
function updateCurrentWeather(currentWeather) {
  // Update DOM with current weather data
}

// Function to update forecast information in DOM
function updateForecast(forecast) {
  // Update DOM with forecast weather data
}

// Function to update search history in DOM
function updateSearchHistory(city) {
  // Update DOM with search history
}

// Event listener for clicking on a city in search history
searchHistoryContainer.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const city = event.target.textContent;
    // Call API to fetch weather data for the clicked city
    fetchWeatherData(city);
  }
});
