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

//format the date for the forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

//change h1 to the city that has been searched for

function search(event) {
  event.preventDefault();
  //#city is the h1 (Regina)
  let searchCity = document.querySelector("#city");
  let searchBar = document.querySelector("#search-bar").value;

  searchCity.innerHTML = `${searchBar}`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar}&APPID=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showTemp);
}

let citySearch = document.querySelector("#search-button");
citySearch.addEventListener("click", search);

let submitEvent = document.querySelector("#search-bar");
submitEvent.addEventListener("submit", search);

//display the actual temperature of the city searched

let units = "metric";
let apiKey = "2f4a61b0876133218968273ba29696cf";

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

function showTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let Temp = celsiusTemperature;
  let tempResult = document.querySelector("#temperature");
  tempResult.innerHTML = `${Temp}`;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = `${Math.round(
    response.data.main.temp_max
  )} | ${Math.round(response.data.main.temp_min)}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

//find coordinates of the city we are searching

function getForecast(coordinates) {
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

//make search work

function search(city) {
  let apiKey = "2f4a61b0876133218968273ba29696cf";
  let units = "metric";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${units}`;

  axios.get(url).then(showTemp);
}

//display the current position when button is clicked
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${lat}, ${lon}`;
}

//find current location
function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentPosition);
//display the current position's temperature when button is clicked

//find current location
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let findLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(findLocation).then(showTemp);
}

navigator.geolocation.getCurrentPosition(currentPosition);

//make the °F buttons work

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function handleSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-bar");
  search(searchElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
