var apiKey = '312ef17758b755a8564935f0cd1d338b'; // Replace with your actual API key from OpenWeatherMap

async function fetchWeatherDataByCityName(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      // Weather data fetched successfully
      return data;
    } else {
      // Handle API error response
      throw new Error(data.message);
    }
  } catch (error) {
    // Handle fetch or JSON parsing errors
    console.error('Error:', error.message);
  }
}

// Usage example:
const city = 'London'; // Replace with the desired city name
fetchWeatherDataByCityName(city)
  .then(data => {
    // Process the weather data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
