async function getTastyApi(searchTerm) {
  const url = "https://tasty.p.rapidapi.com/recipes/list?q=" + searchTerm;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "50d9214a1amsh3bf58b89a12d09ep1173b5jsnedf77ee8a046",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    getRandomRecipes(result.results);
  } catch (error) {
    console.error(error);
  }
}

//randomly select 4 recipes from the array
function getRandomRecipes(results) {
  var recipeCards = document.querySelectorAll(".recipe-card");
  console.log(recipeCards);
  for (let i = 0; i < recipeCards.length; i++) {
    var index = Math.floor(Math.random() * results.length);
    var randomRecipe = results[index];
    var card = recipeCards[i];
    card.querySelector(".recipe-pic").src = randomRecipe.thumbnail_url;
    card.querySelector(".title").innerText = randomRecipe.name;
    card.querySelector(".content").innerText = randomRecipe.description;
    card.querySelector(".title").href = randomRecipe.original_video_url;
    console.log(randomRecipe);
    console.log(randomRecipe.thumbnail_url);
  }
}

//dayjs display date
var currentDate = dayjs();
var formattedDate = currentDate.format("MM-DD-YYYY");
document.getElementById("dateDisplay").textContent = formattedDate;

//bacground audio volume level
//findme recipes btn play event
  document.getElementById("fetchButton").addEventListener("click", function() {
    var audio = document.getElementById("myAudio");
    audio.volume = 0.20;
    audio.play();
  });
  


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

      weatherFood(temperature, description);

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

function weatherFood(temperature, description) {
  if (temperature > 65) {
    if (description == "clear sky") {
      hotClear();
    } else if (
      description == "few clouds" ||
      description == "scattered clouds" ||
      description == "broken clouds"
    ) {
      hotCloudy();
    } else {
      precip();
    }
  } else if (temperature < 65) {
    if (description == "clear sky") {
      coldClear();
    } else if (
      description == "few clouds" ||
      description == "scattered clouds" ||
      description == "broken clouds"
    ) {
      coldCloudy();
    }
  }
}

function hotClear() {
  getTastyApi("grill");
  //grill, salad, Mexican, Spring, bbq, seafood, summer
  //NO stovetop, bake
}

function hotCloudy() {
  getTastyApi("spring");
  //slow cooker, summer, spring, instant pot
  //NO stovetop, bake
}

function coldClear() {
  getTastyApi("every occasion");
  //every occasion, fall, winter
}

function coldCloudy() {
  getTastyApi("bake");
  //fall, slow cooker, bake, winter
}

function precip() {
  getTastyApi("comfort food");
  //bake, winter, comfort food, fall
  //NO grill
}

function errorCallback(error) {
  console.log("Error fetching geolocation:", error);
}

// local storage

var favorites = document.querySelectorAll(".card-footer-item");
console.log(favorites);

for (let i = 0; i < favorites.length; i++) {
  var favBtn = favorites[i];
  console.log(favBtn);

  favBtn.addEventListener("click", function (event) {
    var description =
      event.target.parentElement.parentElement.parentElement.firstElementChild;
    console.log(description.innerHTML);

    localStorage.setItem("description", description.innerHTML);
  });
}

// carousel config & function
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
