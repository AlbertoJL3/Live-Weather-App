var inputEl = $('#input');
var searchBtnEl = $('#searchButton');
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
            console.log(data);
        });

}

//use geocoding API to get lat & lon of a typed in city

//when search is clicked input value saves with saveInput function, and shows results boxes with showResults() function

//showResults() adds the class "display: block" to the results section. 

//saveInput function has (city) input and name of city is turned lower case, turned to lat+lon object and saved locally with local value of city and its lat/lon value.

searchBtnEl.on('click', function () {
    var inputVal = inputEl.val().toLowerCase();
    if (counter <= 4) {
        saveCityLocally(inputVal)
    } else {
        counter = 1;
        saveCityLocally(inputVal)
    }
})

function saveCityLocally(inputVal) {
    JSON.stringify(localStorage.setItem('city' + counter, inputVal));
    counter++;
}

