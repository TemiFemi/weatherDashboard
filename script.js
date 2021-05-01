var myArray = localStorage.getItem("city")
    ? JSON.parse(localStorage.getItem("city"))
    : [];

// function to display search history
function displayHistory() {
    $(".previous-search").empty();
    for (var i = 0; i < myArray.length; i++) {
        var historyCity = $(`<a href="#" class="previous-search-item previous-search-item-action w-100"></a>`);
        historyCity.text(myArray[i]);
        $(".previous-search").prepend(historyCity);
    }
    $(".previous-search-item").on("click", function () {
        var cityName = $(this).text();
        todayWeather(cityName);
        fiveDayForcast(cityName);
    });
}

// function to display weather for current day
function todayWeather(currentWeather) {
    var apiKey = "8af17a7060c2205e40c1b9e5e56df19";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
        currentWeather +
        "&appid=" +
        apiKey;
    // Ajax call to access weather data for today
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        $("#weatherIcon").empty();

        var lat = response.coord.lat
        var lon = response.coord.lon
        fiveDayForcast(currentWeather, lat, lon);
        var currentDate = moment().format("dddd, MM-DD-YY");
        var fahrDegress = Math.round(Math.floor(response.main.temmp - 273.15)) * 1.8 + 32 + "℉";
        var weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        // Dynamically rendering data to the front-end using jQuery
        $("#city").text(response.name);
        $("#currentday").text(currentDate);
        $("#weatherIcon").append(weatherImage);
        $("#currenttemp").text("Temperature: " + fahrDegress);
        $("currentwind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#currenthumidity").text("Humidity: " + response.main.humidity + "%");
    });
}

// User weather button
$("#forecastbutton").on("click", function (event) {
    event.preventDefault();
    var currentCity = $("#userinput").val();
    console.log(currentCity);
    todayWeather(currentCity);
    fiveDayForcast(currentCity)
});
// function to display weather for the next five days
function fiveDayForcast(cityName) {
    var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
    var queryURLFiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&units=imperial&appid=" +
        apiKey;
    // Ajax call for the 5 day forecast
    $.ajax({
        url: queryURLFiveDays,
        method: "GET",
    }).then(function (forecastData) {
        console.log(forecastData);

    })
}
