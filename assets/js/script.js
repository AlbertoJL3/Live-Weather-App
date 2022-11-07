var inputEl = $('#input');
var searchBtnEl = $('#searchButton');
var currentCityEl = $('#current-city');
var currentTempEl = $('#current-temp');
var currentWindEl = $('#current-wind');
var currentHumidEl = $('#current-humidity');
var currentIconEl = $('#current-icon')
var resultsEl = $('#results');
var counter = 0;
var cityData = '';

//use geocoding API to get lat & lon of a typed in city
//Geocoding API is used to save lattitude and longitude of the user's inputted city. 

searchBtnEl.on('click', function () {
    handleButtonSubmit()
})

function handleButtonSubmit() {
    var inputVal = inputEl.val().toLowerCase();
    cityConvert(inputVal)
}

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
            getCurrentCity(city)
        });
}
//sets current city weather data (top box)
function getCurrentCity(city) {
    var currentCityData = JSON.parse(localStorage.getItem(city));
    getForecast(city, currentCityData.lat, currentCityData.lon)
    getDayForecast(city, currentCityData.lat, currentCityData.lon)
}

//5 Day forecast API
function getForecast(city, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityForecastData = {
                CityName: data.city.name,
                CityCountry: data.city.country,
                CityTemp: data.list[0].main.temp,
                CityWind: data.list[0].wind.speed,
                CityHumidity: data.list[0].main.humidity,
                CityWeather: data.list[0].weather[0].icon
            }
            localStorage.setItem(city, JSON.stringify(cityForecastData));
            setCity(city)
        });
}


//after getting data
function setCity(city) {
    var cityObject = JSON.parse(localStorage.getItem(city));
    currentIconEl.attr("src", `http://openweathermap.org/img/w/${cityObject.CityWeather}.png`);
    currentCityEl.text(cityObject.CityName + ', ' + cityObject.CityCountry)
    currentTempEl.text('Temperature: ' + cityObject.CityTemp).append('<span>&#8457;</span>')
    currentWindEl.text('Wind: ' + cityObject.CityWind + 'mph')
    currentHumidEl.text('Humidity: ' + cityObject.CityHumidity + '%')
}


//sets 5 Day forecast data (bottom box(s))
function getDayForecast(city, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var ForecastData = {};
            var j = 2;
            console.log(data)
            for (i = 1; i <= 5; i++) {
                ForecastData[i] = {
                    CityName: data.city.name,
                    CityCountry: data.city.country,
                    CityDate: data.list[j].dt_txt,
                    CityTemp: data.list[j].main.temp,
                    CityWind: data.list[j].wind.speed,
                    CityHumidity: data.list[j].main.humidity,
                    CityWeather: data.list[j].weather[0].icon
                }
                
                localStorage.setItem(city, JSON.stringify(ForecastData));
                var cityObject = JSON.parse(localStorage.getItem(city));
                var iconEl = $('#icon' + i)
                var dateEl = $('#date' + i)
                var tempEl = $('#temp' + i)
                var windEl = $('#wind' + i)
                var humidityEl = $('#humidity' + i)
                iconEl.attr("src", `http://openweathermap.org/img/w/${cityObject[i].CityWeather}.png`);
                tempEl.text('Temperature: ' + cityObject[i].CityTemp).append('<span>&#8457;</span>')
                dateEl.text(moment(cityObject[i].CityDate).format("ddd MMM Do, YYYY"))
                windEl.text('Wind: ' + cityObject[i].CityWind + 'mph')
                humidityEl.text('Humidity: ' + cityObject[i].CityHumidity + '%')
                j = j + 8;
            }
        }
        )
}

//Create function that saves city name as a button 

