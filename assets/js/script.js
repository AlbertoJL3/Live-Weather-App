var inputEl = $('#input');
var searchBtnEl = $('#searchButton');
var currentCityEl = $('#current-city');
var currentTempEl = $('#current-temp');
var currentWindEl = $('#current-wind');
var currentHumidEl = $('#current-humidity');
var resultsEl = $('#results');
var counter = 1;

//5 Day forecast API
function getForecast(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&limit=5&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

//use geocoding API to get lat & lon of a typed in city
//Geocoding API
function cityConvert(city) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&units=imperial&appid=2f6ede596cae9b405c9a790f743a5685', {
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
            console.log(cityData);
        });

}
//when search is clicked input value saves with saveInput function, and shows results boxes with showResults() function
//showResults() adds the class "display: block" to the results section. 
//saveInput function has (city) input and name of city is turned lower case, turned to lat+lon object and saved locally with local value of city and its lat/lon value.

searchBtnEl.on('click', function () {
    var inputVal = inputEl.val().toLowerCase();
    if (counter <= 5) {
        saveCityLocally(inputVal)
        getCity(counter);
        counter++;
    } else if (counter == 6) {
        counter = 1;
        saveCityLocally(inputVal)
        getCity(counter);
    }
    cityConvert(inputVal);
})
function saveCityLocally(inputVal) {
    JSON.stringify(localStorage.setItem('city' + counter, cityConvert(inputVal)));

}

function getCity(number) {
    var city = localStorage.getItem('city' + number)
}

