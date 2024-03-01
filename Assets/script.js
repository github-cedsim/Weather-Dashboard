// Get elements from DOM

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistoryContainer = document.getElementById('search-history-container');
const apiKey = "2d921f47c4cc133aeee4dd3691099ae1";
let city = ""
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Event listener for form submit
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector(".right-side").style.display = "block";
    city = cityInput.value;
    // Call API to fetch weather data for the city
    fetchWeatherData(city);
    updateSearchHistory(city);
});

// Function to fetch weather data from API
function fetchWeatherData(city) {

    // Call API and retrieve current and forecast weather data for the city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        // Update DOM with retrieved data using DOM manipulation
        console.log(data)
        updateCurrentWeather(data);
        updateFiveForecast(data.coord);
    })

}

// Function to update current weather information in DOM

function updateCurrentWeather(currentWeather) {
    // Update DOM with current weather data
    currentWeatherContainer.innerHTML = `
  <h2>${currentWeather.name}</h2>
  <p class="date-image">Date: ${new Date(currentWeather.dt * 1000).toLocaleDateString()} <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="weather icon"></p>
  <p>Temperature: ${currentWeather.main.temp}</p>
  <p>Humidity: ${currentWeather.main.humidity}</p>
  <p>Wind Speed: ${currentWeather.wind.speed}</p>
  `
}
