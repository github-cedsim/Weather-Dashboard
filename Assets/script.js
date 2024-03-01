// Get elements from DOM

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistoryContainer = document.getElementById('search-history-container');
const apiKey = "dbc8865c28c2ad96f8f621df6535c4d4";
let city = ""
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

