var inputEl = $('#input');
var searchBtnEl = $('#searchButton');
var currentCityEl = $('#current-city');
var currentTempEl = $('#current-temp');
var currentWindEl = $('#current-wind');
var currentHumidEl = $('#current-humidity');
var currentIconEl = $('#current-icon')
var resultsEl = $('#results');
var counter = 1;
var cityData



//use geocoding API to get lat & lon of a typed in city
//Geocoding API is used to save lattitude and longitude of the user's inputted city. 
function cityConvert(city) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityData = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            localStorage.setItem(city, JSON.stringify(cityData));
        });
}


//5 Day forecast API
function getForecast(city, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityForecastData = {
                CityName: data.city.name,
                CityCountry: data.city.country,
                CityTemp: data.list[6].main.temp,
                CityWind: data.list[1].wind.speed,
                CityHumidity: data.list[6].main.humidity,
                CityWeather: data.list[6].weather[0].icon
            }
            localStorage.setItem(city, JSON.stringify(cityForecastData));
            console.log(data)
        });
}

function getCurrentCity(city) {
    var currentCityData = JSON.parse(localStorage.getItem(city));
    getForecast(city, currentCityData.lat, currentCityData.lon)
}

function setCity(city) {
    var cityObject = JSON.parse(localStorage.getItem(city));
    currentIconEl.attr("src",`http://openweathermap.org/img/w/${cityObject.CityWeather}.png`);
    currentCityEl.text(cityObject.CityName + ', ' + cityObject.CityCountry)
    currentTempEl.text('Temperature: ' + cityObject.CityTemp + 'Fahrenheit  ')
    currentWindEl.text('Wind: ' + cityObject.CityWind +'mph')
    currentHumidEl.text('Humidity: ' + cityObject.CityHumidity+'%')
}

searchBtnEl.on('click', function () {
    var inputVal = inputEl.val().toLowerCase();
    cityConvert(inputVal)
    getCurrentCity(inputVal)
    setCity(inputVal)
});

