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
//Day 1 Variables
var icon1El = $('#icon1')
var date1El = $('#date1')
var temp1El = $('#temp1')
var wind1El = $('#wind1')
var humidity1El = $('#humidity1')
//Day 2 Variables
var icon2El = $('#icon2')
var date2El = $('#date2')
var temp2El = $('#temp2')
var wind2El = $('#wind2')
var humidity2El = $('#humidity2')
//Day 3 Variables
var icon3El = $('#icon3')
var date3El = $('#date3')
var temp3El = $('#temp3')
var wind3El = $('#wind3')
var humidity3El = $('#humidity3')
//Day 4 Variables
var icon4El = $('#icon4')
var date4El = $('#date4')
var temp4El = $('#temp4')
var wind4El = $('#wind4')
var humidity4El = $('#humidity4')
//Day 5 Variables
var icon5El = $('#icon5')
var date5El = $('#date5')
var temp5El = $('#temp5')
var wind5El = $('#wind5')
var humidity5El = $('#humidity5')
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
            console.log(data)
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


//5 Day forecast
function getDayForecast(city, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 1; i <= 5; i++) {
                var cityDayForecastData = {
                    CityName: data.city.name,
                    CityCountry: data.city.country,
                    CityTemp: data.list[i].main.temp,
                    CityWind: data.list[i].wind.speed,
                    CityHumidity: data.list[i].main.humidity,
                    CityWeather: data.list[i].weather[0].icon
                }
                localStorage.setItem(city, JSON.stringify(cityDayForecastData));
                console.log(data)
                var cityObject = JSON.parse(localStorage.getItem(city));
                var iconEl = $('#icon'+i)
                var dateEl = $('#date'+i)
                var tempEl = $('#temp'+i)
                var windEl = $('#wind'+i)
                var humidityEl = $('#humidity'+i)
                iconEl.attr("src", `http://openweathermap.org/img/w/${cityObject.CityWeather}.png`);
                tempEl.text('Temperature: ' + cityObject.CityTemp).append('<span>&#8457;</span>')
                windEl.text('Wind: ' + cityObject.CityWind + 'mph')
                humidityEl.text('Humidity: ' + cityObject.CityHumidity + '%')
            }
        });
}


