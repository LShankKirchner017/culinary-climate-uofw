var recipeCards = document.querySelectorAll(".recipe-card")
console.log(recipeCards)

async function getTastyApi(searchTerm) {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?q=' + searchTerm;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '50d9214a1amsh3bf58b89a12d09ep1173b5jsnedf77ee8a046',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
    const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); //randomly select 4 from the array of 20
         getRandomRecipes(result.results)
    } catch (error) {
        console.error(error);
    }
}

function getRandomRecipes(results){
  for (let i = 0; i < 4; i++) {
    var index = Math.floor(Math.random() * results.length);
    var randomRecipe = results[index];
    var card = recipeCards[i]
    card.querySelector(".title").innerText = randomRecipe.name
    console.log(randomRecipe)
  }
}

//dayjs display date
var currentDate = dayjs();
var formattedDate = currentDate.format('MM-DD-YYYY');
document.getElementById('dateDisplay').textContent = formattedDate;

//weather api and geo location api
document.getElementById('fetchButton').addEventListener('click', fetchWeather);

function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function successCallback(position) {
  var apiKey = '312ef17758b755a8564935f0cd1d338b';
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude+ `&appid=` + apiKey + `&units=imperial`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var description = data.weather[0].description;
      var iconCode = data.weather[0].icon;
      var cityName = data.name;

      weatherFood(temperature, description)

      var card = document.createElement('div');
      card.classList.add('card');

      var cityNameElement = document.createElement('h2');
      cityNameElement.textContent = cityName;

      var temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: `+ temperature + `°F`;

      var humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ` + humidity + `%`;

      var descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ` + description + ``;

      var iconElement = document.createElement('img');
      iconElement.src = `https://openweathermap.org/img/w/` + iconCode + `.png`;
      iconElement.alt = 'Weather Icon';

      card.appendChild(cityNameElement);
      card.appendChild(temperatureElement);
      card.appendChild(humidityElement);
      card.appendChild(descriptionElement);
      card.appendChild(iconElement);

      const weatherContainer = document.getElementById('weatherContainer');
      weatherContainer.innerHTML = '';
      weatherContainer.appendChild(card);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

function weatherFood(temperature, description) { 
  if (temperature > 65) {
    if (description == "clear sky") {
      hotClear()
    } else if (description == "few clouds" || description == "scattered clouds" || description == "broken clouds") {
      hotCloudy()
    } else {
      precip()
    }
  } else if (temperature < 65) {
    if (description == "clear sky") {
      coldClear()
    } else if (description == "few clouds" || description == "scattered clouds" || description == "broken clouds"){
      coldCloudy()
    }
  }
}

function hotClear() {
  getTastyApi("grill")
  //grill, salad, Mexican, Spring, bbq, seafood, summer
  //NO stovetop, bake
}

function hotCloudy() {
  getTastyApi("bbq")
  console.log("hot and cloudy")
  //slow cooker, summer, spring, instant pot
  //NO stovetop, bake
}

function coldClear() {
  getTastyApi("fall")
  //every occasion, fall, winter
}

function coldCloudy() {
  getTastyApi("winter")
  //fall, slow cooker, bake, winter
}

function precip() {
  getTastyApi("comfort food")
  //bake, winter, comfort food, fall 
  //NO grill
}

function errorCallback(error) {
  console.log('Error fetching geolocation:', error);
}