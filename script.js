var myArray = localStorage.getItem("city")
    ? JSON.parse(localStorage.getItem("city"))
    : [];
// function to display search history
function displayHistory() {
    $(".lastSearch").empty();
    for (var i = 0; i < myArray.length; i++) {
        var cityHistory = $(
            `<a href="#" class="lastSearch-item lastSearch-item-action w-100"></a>`
        );
        cityHistory.text(myArray[i]);
        $(".lastSearch").prepend(cityHistory);
    }
    $(".lastSearch-item").on("click", function () {
        var cityName = $(this).text();
        todayWeather(cityName);
        fiveDayForecast(cityName);
    });
}
// function to display weather for current day
function todayWeather(currentWeather) {
    var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        currentWeather +
        "&appid=" +
        apiKey;
    // Ajax call to access weather data for today
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        $("#weatherIcon").empty();

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        fiveDayForecast(currentWeather, lat, lon);
        var currentDate = moment().format("dddd, MM-DD-YYYY");
        var fahrDegrees =
            Math.round(Math.floor(response.main.temp - 273.15)) * 1.8 + 32 + " ℉";
        var weatherImage = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        );
        // Dynamically rendering data to the front-end using jQuery
        $("#city").text(response.name);
        $("#currentday").text(currentDate);
        $("#weatherIcon").append(weatherImage);
        $("#currenttemp").text("Temperature: " + fahrDegrees);
        $("#currentwind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#currenthumidity").text("Humidity: " + response.main.humidity + "%");
    });
}
// User weather button
$("#buttonForecast").on("click", function (event) {
    event.preventDefault();
    var currentCity = $("#userinput").val();
    console.log(currentCity);
    todayWeather(currentCity);
    fiveDayForecast(currentCity);
});
// function to display weather for the next five days
function fiveDayForecast(cityName) {
    var apiKey = "48af17a7060c2205e40c1b9e5e56df19";
    var queryURLFiveDays =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&units=imperial&appid=" +
        apiKey;
    // Ajax call for the 5 day forecast
    $.ajax({
        url: queryURLFiveDays,
        method: "GET",
    }).then(function (forecastData) {
        console.log(forecastData);
        // console.log(forecastData.daily[0].dt);
        $("#dayone").html(`<div class="card">
    <div class="card-body">
      <h5 id="date" class="card-text">${new Date(
            forecastData.list[0].dt_txt
        ).toDateString()} </h5>
      <img src="http://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon
            }.png" id="currentuv" class="card-text">
      <p id="currenttemp" class="card-text">Temp: ${forecastData.list[0].main.temp
            } ℉</p>
      <p id="currenthumidity" class="card-text">Humidity: ${forecastData.list[0].main.humidity
            }% </p>
      <p id="currentwind" class="card-text">Wind Speed: ${forecastData.list[0].wind.speed
            } MPH</p>
    </div>
  </div>`);
        $("#daytwo").html(`<div class="card">
    <div class="card-body">
    <h5 id="date" class="card-text">${new Date(
            forecastData.list[7].dt_txt
        ).toDateString()} </h5>
    <img src="http://openweathermap.org/img/wn/${forecastData.list[7].weather[0].icon
            }.png" id="currentuv" class="card-text">
      <p id="currenttemp" class="card-text">Temp: ${forecastData.list[7].main.temp
            } ℉</p>
      <p id="currenthumidity" class="card-text">Humidity: ${forecastData.list[7].main.humidity
            }% </p>
      <p id="currentwind" class="card-text">Wind Speed: ${forecastData.list[7].wind.speed
            } MPH</p>
    </div>
  </div>`);
        $("#daythree").html(`<div class="card">
    <div class="card-body">
    <h5 id="date" class="card-text">${new Date(
            forecastData.list[15].dt_txt
        ).toDateString()} </h5>
    <img src="http://openweathermap.org/img/wn/${forecastData.list[15].weather[0].icon
            }.png" id="currentuv" class="card-text">
      <p id="currenttemp" class="card-text">Temp: ${forecastData.list[15].main.temp
            } ℉</p>
      <p id="currenthumidity" class="card-text">Humidity: ${forecastData.list[15].main.humidity
            }% </p>
      <p id="currentwind" class="card-text">Wind Speed: ${forecastData.list[15].wind.speed
            } MPH</p>
    </div>
  </div>`);
        $("#dayfour").html(`<div class="card">
    <div class="card-body">
    <h5 id="date" class="card-text">${new Date(
            forecastData.list[23].dt_txt
        ).toDateString()} </h5>
    <img src="http://openweathermap.org/img/wn/${forecastData.list[23].weather[0].icon
            }.png" id="currentuv" class="card-text">
      <p id="currenttemp" class="card-text">Temp: ${forecastData.list[23].main.temp
            } ℉</p>
      <p id="currenthumidity" class="card-text">Humidity: ${forecastData.list[23].main.humidity
            }% </p>
      <p id="currentwind" class="card-text">Wind Speed: ${forecastData.list[23].wind.speed
            } MPH</p>
    </div>
  </div>`);
        $("#dayfive").html(`<div class="card">
    <div class="card-body">
    <h5 id="date" class="card-text">${new Date(
            forecastData.list[31].dt_txt
        ).toDateString()} </h5>
    <img src="http://openweathermap.org/img/wn/${forecastData.list[31].weather[0].icon
            }.png" id="currentuv" class="card-text">
      <p id="currenttemp" class="card-text">Temp: ${forecastData.list[31].main.temp
            } ℉</p>
      <p id="currenthumidity" class="card-text">Humidity: ${forecastData.list[31].main.humidity
            }% </p>
      <p id="currentwind" class="card-text">Wind Speed: ${forecastData.list[31].wind.speed
            } MPH</p>
    </div>
  </div>`);
    });
}
// Function to display last searched city when the application loads
function previousSearch() {
    var cityKey = JSON.parse(localStorage.getItem("city"));
    var cityOnPage = cityKey[cityKey.length - 1];
    console.log(cityOnPage);

    todayWeather(cityOnPage);
    fiveDayForecast(cityOnPage);
}
previousSearch();