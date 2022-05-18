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

function displayForecast() {
  let forecastElement = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-1">
          <h5 class="forecast-day">${day}</h5>
          <span class="forecast-max"> 17° </span>
          <span class="forecast-min"> 10° </span>
          <img
            src="data:image/jpeg;base64,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"
            alt="weather-image"
            width="30"
          />
        </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
