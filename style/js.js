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

//make the °C and °F buttons work

function tempC(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  tempCelsius.innerHTML = "🌦️-4";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", tempC);

function tempT(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = "🌦️25";
}

let Fahrenheit = document.querySelector("#fahrenheit");
Fahrenheit.addEventListener("click", tempT);

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

function showTemp(response) {
  let Temp = Math.round(response.data.main.temp);
  let tempResult = document.querySelector("#temperature");
  tempResult.innerHTML = `${Temp}`;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].icon);

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
