var inputEl = $('#input');
var searchBtnEl = $('#searchButton');
var currentCityEl = $('#current-city');
var currentTempEl = $('#current-temp');
var currentWindEl = $('#current-wind');
var currentHumidEl = $('#current-humidity');
var resultsEl = $('#results');
var counter = 1;
var cityData
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
            localStorage.setItem('city' + counter, JSON.stringify(cityData));
            //console.log(cityData);
        });
}

searchBtnEl.on('click', function () {
    var inputVal = inputEl.val().toLowerCase();
    if (counter <= 5) {
        cityConvert(inputVal)
        counter++;
    } else if (counter == 6) {
        counter = 1;
        cityConverty(inputVal)
    } 
});