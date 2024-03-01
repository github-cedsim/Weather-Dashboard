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
  <p class="date-image">Date: ${new Date(currentWeather.dt * 1000).toLocaleDateString()} <img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="weather icon"></p>
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

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        forecastContainer.innerHTML = "";
        for (let i = 0; i < data.list.length; i += 8) {
            forecastContainer.innerHTML += `
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">${new Date(data.list[i].dt * 1000).toLocaleDateString()}</h5>
            <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="weather icon">
            
            <p class="card-text">Temperature: ${data.list[i].main.temp}</p>
            <p class="card-text">Humidity: ${data.list[i].main.humidity}</p>
            <p class="card-text">Wind Speed: ${data.list[i].wind.speed}</p>
            </div>
            </div>
            `
        }
    })
}

// Function to update search history in DOM
function updateSearchHistory(city) {
    // Update DOM with search history
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }
    localStorage.setItem("search", JSON.stringify(searchHistory));
    searchHistoryContainer.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        searchHistoryContainer.innerHTML += `
        <button onclick="fetchWeatherData('${searchHistory[i]}')">${searchHistory[i]}</button> 
        `
    }
}

// Event listener for clicking on a city in search history
searchHistoryContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const city = event.target.textContent;
        // Call API to fetch weather data for the clicked city
        fetchWeatherData(city);
    }
});