const form = document.getElementById('form');
const input = document.getElementById('input');
const searchButton = document.getElementById('search-button');
const content = document.getElementById('content');
const nav = document.getElementsByTagName('nav').item(0)

async function getWeatherForecast(location) {
    try {
        searchButton.innerText = 'sync';
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7d4dc2f4d55f48dcbbb182257241904&q=${location}&aqi=no`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    } catch (e) {
        console.error('Error fetching weather forecast:', e);
        alert('An error occurred while fetching the weather forecast')
    } finally {
        searchButton.innerText = 'search'
    }
}

function clearContent() {
    // Clear the content
    content.innerHTML = '';

    // Hide the header
    nav.className = 'hidden';
}

function displayWeatherForecast(forecast) {
    // Display the weather forecast
    const location = forecast.location;
    const current = forecast.current;

    // show the header
    nav.className = '';
    document.getElementById('location').innerText = `${location.name}, ${location.country}`;

    const temperatureElement = document.createElement('h1');
    temperatureElement.className = 'temperature';
    temperatureElement.textContent = `${current.temp_c}°`;

    const infoElements = document.createElement('div');
    infoElements.className = 'info-container';

    const windElement = document.createElement('p');
    windElement.className = 'info';
    windElement.textContent = `${current.wind_kph} km/h`;

    const windIcon = document.createElement('i');
    windIcon.className = 'material-icons';
    windIcon.textContent = 'navigation';

    windElement.prepend(windIcon);

    const humidityElement = document.createElement('p');
    humidityElement.className = 'info';
    humidityElement.textContent = `${current.humidity}%`;

    const humidityIcon = document.createElement('i');
    humidityIcon.className = 'material-icons';
    humidityIcon.textContent = 'water_drop';

    humidityElement.prepend(humidityIcon);

    infoElements.append(windElement, humidityElement);

    const header = document.createElement('div');
    header.className = 'header';
    header.append(temperatureElement, infoElements);

    content.appendChild(header);

    const conditionContainer = document.createElement('div');
    conditionContainer.className = 'condition';

    // show condition icon
    const conditionIcon = document.createElement('img');
    conditionIcon.src = `https:${current.condition.icon}`;

    const conditionElement = document.createElement('p');
    conditionElement.textContent = current.condition.text;

    conditionContainer.append(conditionIcon, conditionElement);

    content.appendChild(conditionContainer);
}

// Add a new task
form.addEventListener('submit', async (event) => {
    // stops the page from refreshing
    event.preventDefault();

    // don't do anything if a previous request is still loading
    if (searchButton.innerText === 'sync') {
        return;
    }

    const value = input.value;
    if (!value || value.trim() === '') {
        alert('Please enter a location');
        return;
    }

    // Get the weather forecast
    const forecast = await getWeatherForecast(value);

    // show error message if the location is not found
    if (forecast.error) {
        alert(forecast.error.message);
        return;
    }

    clearContent();
    displayWeatherForecast(forecast)
});