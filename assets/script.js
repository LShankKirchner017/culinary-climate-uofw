async function getTastyApi(searchTerm) {
  const url = "https://tasty.p.rapidapi.com/recipes/list?q=" + searchTerm;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1b0bb19499msh05d0b2dc53cd501p14c09bjsnefe3bf5139b3",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getTastyApi("cheese");
getTastyApi("chicken");
getTastyApi("pasta");

//dayjs display date
var currentDate = dayjs();
var formattedDate = currentDate.format("MM-DD-YYYY");
document.getElementById("dateDisplay").textContent = formattedDate;

//weather api and geo location api
document.getElementById("fetchButton").addEventListener("click", fetchWeather);

function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  var apiKey = "312ef17758b755a8564935f0cd1d338b";
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=` +
    latitude +
    `&lon=` +
    longitude +
    `&appid=` +
    apiKey +
    `&units=imperial`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var description = data.weather[0].description;
      var iconCode = data.weather[0].icon;
      var cityName = data.name;

      var card = document.createElement("div");
      card.classList.add("card");

      var cityNameElement = document.createElement("h2");
      cityNameElement.textContent = cityName;

      var temperatureElement = document.createElement("p");
      temperatureElement.textContent = `Temperature: ` + temperature + `°F`;

      var humidityElement = document.createElement("p");
      humidityElement.textContent = `Humidity: ` + humidity + `%`;

      var descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Description: ` + description + ``;

      var iconElement = document.createElement("img");
      iconElement.src = `https://openweathermap.org/img/w/` + iconCode + `.png`;
      iconElement.alt = "Weather Icon";

      card.appendChild(cityNameElement);
      card.appendChild(temperatureElement);
      card.appendChild(humidityElement);
      card.appendChild(descriptionElement);
      card.appendChild(iconElement);

      const weatherContainer = document.getElementById("weatherContainer");
      weatherContainer.innerHTML = "";
      weatherContainer.appendChild(card);
    })
    .catch((error) => {
      console.log("Error fetching weather data:", error);
    });
}

function errorCallback(error) {
  console.log("Error fetching geolocation:", error);
}

var config = {
  type: "carousel",
  perView: 3,
  breakpoints: {
    767: {
      perView: 2,
    },
  },
};
new Glide(".glide", config).mount();
