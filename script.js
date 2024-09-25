
const weatherInfo = document.getElementById('weatherInfo');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');

const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeather API key

async function getWeather(location) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
    }
}

function displayWeather(data) {
    const { name, weather, main, wind } = data;
    weatherInfo.innerHTML = `
        <p>Location: ${name}</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = `<p>Please enter a location.</p>`;
    }
});
