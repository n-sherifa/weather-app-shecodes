const apiKey = "0c60b44de21864bb56fa99961d3cdc57";
getCurrentLocationWeather();

let form = document.getElementById("form")
let locationSearch = document.getElementById("location-search")
let currentLocationBtn = document.getElementById("current-location")
let date = document.getElementById("date")
let humidity = document.getElementById("humidity")
let Windspeed = document.getElementById("wind")


date.innerText = formatDate(new Date())

let city = document.getElementById("city")
let description = document.getElementById("description")
let temp = document.getElementById("temp")

form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("loading....")
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${locationSearch.value}&appid=${apiKey}&&units=metric`)
        .then(displayWeather)
})


function displayWeather(res)
{
    console.log(res.data)
    city.innerText = res.data.name;
    description.innerText = res.data.weather[0].description
    temp.innerText = Math.round(res.data.main.temp)
    humidity.innerHTML =  res.data.main.humidity
  wind.innerHTML = res.data.wind.speed 
}

currentLocationBtn.addEventListener("click", getCurrentLocationWeather);


function getCurrentLocationWeather()
{
    console.log("getting current locaiton....")
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("loading weather....")
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then(displayWeather);
    }); 
}

function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
