const apiKey =`ede3579e2c7223e82a9cba5fa4573956`;
const searchBtn = document.getElementById('searchButton');
const inputElement = document.getElementById('input');
const inputData = document.getElementById('location');
const CountryElement = document.getElementById('country');
const dateElement = document.getElementById('date');
const currentTemp = document.getElementById('currentTemp');
const futureForcasting = document.getElementById('weather-forcast');
const defaultCity = "Assam";
const icon = document.getElementById('search');
const videoElement = document.getElementById('video-container');
const videoSource = document.getElementById('video-source');

const days=['Sunday','Monday','Tuesday','Wednesday','friday','thursday','saturday'];
const months =['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec']

searchBtn.addEventListener('click', function(e){
  e.preventDefault();
  const city = inputElement.value.trim();
  if(city!==''){
    fetchWeatherData(city);
  }
})


setInterval(()=>{
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  dateElement.innerHTML = days[day]+" "+date+" "+months[month];
},1000)


  async function fetchWeatherData(city){ 
     const response= await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    const data = await response.json();
    console.log(data);
    showWeather(data);
  }

  function showWeather(data){
   let {humidity, pressure, feels_like,temp}=data.main;
   let {speed}= data.wind;
   let description= data.weather[0].description;
   let iconeCode = data.weather[0].icon;
   console.log(data.name);
   let cityName =data.name;
  currentTemp.innerHTML =`<div class="gap">
<img src="https://openweathermap.org/img/wn/${iconeCode}@2x.png" alt="weather icon" class="w icon" id="search">
<div class="display">
  <div class="degre">${Math.round(temp)}&deg; C</div>
  <div class="Sunny">${description}</div>
</div>
</div>
<div class="humidity" id="current-weather-items">
<div class="weather-items">
  <div>Humidity</div>
<div>${humidity}</div>
</div>
<div class="weather-items">
  <div>Pressure</div>
 <div>${pressure}</div>
  </div>
 <div class="weather-items">
  <div>Windspeed</div>
 <div>${speed}</div>
 </div>
<div class="weather-items">
  <div>feels_like</div>
 <div>${feels_like}</div>
  </div>`;
CountryElement.innerHTML = cityName;
changeVideo(description);
}

function changeVideo(weatherDescription) {
  let videoFile;
  switch (weatherDescription.toLowerCase()) {
      case 'haze':
          videoFile = 'haze.mp4';
          break;
      case 'snow':
          videoFile = 'snowfall.mp4';
          break;
      case 'rain':
          videoFile = 'rainy.mp4';
          break;
      case 'scattered clouds':
          videoFile = 'cloudy.mp4';
          break;
      case 'strom':
        videoFile = 'strom.mp4';
      default:
          videoFile = 'default.mp4';
  }

  videoSource.setAttribute('src', videoFile);
  videoElement.load();
}

document.addEventListener('DOMContentLoaded', function() {
  fetchWeatherData(defaultCity);})
