// Get elements from DOM

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistoryContainer = document.getElementById('search-history-container');
const apiKey = "dbc8865c28c2ad96f8f621df6535c4d4";
let city = ""

// Event listener for form submit
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    city = cityInput.value;
    // Call API to fetch weather data for the city
    fetchWeatherData(city);
});

// Function to fetch weather data from API
function fetchWeatherData(city) {

    // Call API and retrieve current and forecast weather data for the city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`).then(function (response) {
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
  <p>Date: ${new Date(currentWeather.dt * 1000).toLocaleDateString()}</p>
  <p>Temperature: ${currentWeather.main.temp}</p>
  <p>Humidity: ${currentWeather.main.humidity}</p>
  <p>Wind Speed: ${currentWeather.wind.speed}</p>
  `
}

// Function to update forecast information in DOM
function updateFiveForecast(coord) {
    // Update DOM with forecast weather data
    let lat = coord.lat;
    let lon = coord.lon;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        forecastContainer.innerHTML = `
        <h2>5-Day Forecast</h2>
        </h2>`;
        
    })
}

// Function to update search history in DOM
function updateSearchHistory(city) {
    // Update DOM with search history
}

// Event listener for clicking on a city in search history
searchHistoryContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const city = event.target.textContent;
        // Call API to fetch weather data for the clicked city
        fetchWeatherData(city);
    }
});
