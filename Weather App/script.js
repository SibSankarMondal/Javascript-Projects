// Targeting elements

let weatherBox = document.querySelector(".weather-box")
let cityElement = document.querySelector("#city")
let dateElement = document.querySelector("#date")
let tempElement = document.querySelector("#temp")
let windElement = document.querySelector("#wind")
let weatherElement = document.querySelector("#weather")
let weatherImage = document.querySelector("#image")
const form = document.querySelector("form")



// Fetch api


async function getWeather(city) {
  
const apiKey = 'c148ddada3dd6d7a37d3137efe40c49f';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    console.log(data)
    return data;

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// display data

function displayWeather(data) {

  if (data.cod == "404") {
    cityElement.innerHTML = `<h2> City Not Found <h2>`
    return;
}
  cityElement.innerHTML = data.name;
  dateElement.innerHTML = new Date().toLocaleDateString();
  tempElement.innerHTML = ` ${ Math.round(data.main.temp)}°C`;
  windElement.innerHTML= `Wind: ${data.wind.speed}`;
  weatherElement.innerHTML = ` ${data.weather[0].main}`;
  weatherImage.innerHTML= `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
}

// search city

form.addEventListener("submit", function (event) {
  
  const cityInput = document.querySelector("#input-box").value;
  if (cityInput) {
    getWeather(cityInput).then(function (data) {
      displayWeather(data);
      weatherBox.style.display = "block";
    });

 
  } else {
    alert('Please enter a city name');
  }
  event.preventDefault();
});

