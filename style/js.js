//set date and time
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let day = now.getDay();
let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let theDay = days[now.getDay()];

let month = now.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let theMonth = months[now.getMonth()];

let currentDateTime = document.querySelector("#currentDate");
currentDateTime.innerHTML = `${theDay} ${theMonth} ${date} | ${hours}:${minutes}`;

//change h1 to the city that has been searched for

// function search(event) {
//   event.preventDefault();
//   //#city is the h1 (Regina)
//   let searchCity = document.querySelector("#city");
//   let searchBar = document.querySelector("#search-bar").value;

//   searchCity.innerHTML = `${searchBar}`;
//   let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar}&APPID=${apiKey}&units=${units}`;
//   axios.get(weatherUrl).then(showTemp);
// }

let citySearch = document.querySelector("#search-button");
citySearch.addEventListener("click", search);

let submitEvent = document.querySelector("#search-bar");
submitEvent.addEventListener("submit", search);

//display the actual temperature of the city searched

let units = "metric";
let apiKey = "2f4a61b0876133218968273ba29696cf";

//make search work

function search(city) {
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`;
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = city;

  axios.get(url).then(showTemp);
}
//click on button to call current location
let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", showLocation);

//find current location
function showLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
  //navigator.geolocation.getCurrentPosition(currentPosition);
}
//display the current position when button is clicked
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let cityNameApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

  axios.get(cityNameApiUrl).then(findCity);
}

function findCity(response) {
  let city = response.data[0].name;
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;
  let units = "metric";
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempResult = document.querySelector("#temperature");
  tempResult.innerHTML = celsiusTemperature;
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C | ${Math.round(response.data.main.temp_min)}°C`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}
//format the date for the forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}
//show forecast for week
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-1">
          <h5 class="forecast-day">${formatDay(forecastDay.dt)}</h5>
          <span class="forecast-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="forecast-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="weather-image"
            width="30"
          />
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// //make the °F button work

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
  //still need to change the classes on this
}

//make celsius link active each time search is clicked.
function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  //still need to change the classes on this
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let celsiusTemperature = null;

function handleSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-bar");
  search(searchElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Dublin");
