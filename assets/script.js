async function getTastyApi(searchTerm) {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?q=' + searchTerm;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1b0bb19499msh05d0b2dc53cd501p14c09bjsnefe3bf5139b3',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
    const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getTastyApi('cheese')
getTastyApi('chicken')
getTastyApi('pasta')

document.getElementById('fetchButton').addEventListener('click', fetchWeather);
document.getElementById('cityInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default Enter key behavior (form submission)

    fetchWeather();
  }
});

function fetchWeather() {
  var apiKey = '312ef17758b755a8564935f0cd1d338b';
  var city = document.getElementById('cityInput').value;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var description = data.weather[0].description;
      var iconCode = data.weather[0].icon;

      
      var card = document.createElement('div');
      card.classList.add('card');


      var temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${temperature}°C`;

      var humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${humidity}%`;

      var descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ${description}`;

      var iconElement = document.createElement('img');
      iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
      iconElement.alt = 'Weather Icon';

      
      card.appendChild(temperatureElement);
      card.appendChild(humidityElement);
      card.appendChild(descriptionElement);
      card.appendChild(iconElement);

      const weatherContainer = document.getElementById('weatherContainer');
      weatherContainer.innerHTML = ''; // Clear previous results
      weatherContainer.appendChild(card);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}
