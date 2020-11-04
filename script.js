$(document).ready(function () {
  // need to store my API key
  var APIkey = "1454392d03a2419ff4eef4a809656678";
  var cityInput = "";
  $("#current-day").text(moment().format('MMMM Do YYYY, hh:mm:ss a'));

  var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];

  $("#five-day").empty();
  $(".search").on("click", function (event) {
    cityInput = $('#search-box').val().trim()
    event.preventDefault();
    // set here your local storage!
    localStorage.setItem("citySearches", JSON.stringify(citySearches));
    currentAPI(cityInput);
    fiveDayAPI(cityInput);
  });

  function currentAPI(cityInput) {


    citySearches.push(cityInput)
    console.log(citySearches)

    // localStorage.setItem("citySearches", JSON.stringify(citySearches));

    // building query URL link
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey + "&units=imperial"

    // callig Ajax

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

      // displaying info (temp, humidity etc), use jquery, appending to HTML
      var cityDiv = $("#city").text(response.name);
      var tempDiv = $("#temp").text("Temperature: " + response.main.temp + "F");
      var weathDiv = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      var humidDiv = $("#humidity").text("Humidity: " + response.main.humidity + "%");
      var windDiv = $("#wind-speed").text("Wind-speed: " + response.wind.speed);
      $("#weather").html(weathDiv)


      searchHistory();
      getUVIndex(response.coord.lat, response.coord.lon);
      uvColorChange();
    });

  }

  function fiveDayAPI(fivedayURL) {

    var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIkey + "&units=imperial"

    $.ajax({
      url: fivedayURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      $("#five-day").empty();

      var results = response.list;
      console.log(results);

      // variable to store 5 day array
      var fiveDay = []
      // create loop to filter days based on time of day
      for (var i = 0; i < results.length; i++) {
        // variable for date and time string
        var dateTime = results[i].dt_txt

        // if time string includes noon put entire object in five day array
        if (dateTime.includes("12:00:00")) {
          fiveDay.push(results[i])
        }
      }

      console.log(fiveDay)

      for (var i = 0; i < fiveDay.length; i++) {

        moment(fiveDay[i].dt_txt).format('MMMM Do YYYY')

        var dayoneDiv = $("<div>")

        var date = $("<p>").text(moment(fiveDay[i].dt_txt).format('MMMM Do YYYY'));
        var pTemp = $("<p>").text("Temp: " + fiveDay[i].main.temp + "F");
        var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[i].weather[0].icon + ".png")
        var pHumid = $("<p>").text("Humidity: " + fiveDay[i].main.humidity + "%")
        dayoneDiv.append(date, pTemp, pWeath, pHumid)
        $("#card-title" + [i]).empty().prepend(dayoneDiv)

      }

    });
  }

  $("#clear").on("click", function (event) {
    event.preventDefault();

    $("#card-title1").empty();
    $("#card-title2").empty();
    $("#card-title3").empty();
    $("#card-title4").empty();
    $("#card-title5").empty();

    $(".location").empty();
    $("#search-box").empty()
    localStorage.clear();
    $(".list-group").empty();
    location.reload();
  })

  // creating function for search history

  function searchHistory() {

    $(".list-group").empty();

    for (var i = 0; i < citySearches.length; i++) {
      var li = $("<li>");
      li.addClass("list-group-item city-list");
      li.attr("data-city", citySearches[i]);
      li.text(citySearches[i])

      $(".list-group").prepend(li);
    }
  }
  searchHistory();

  // funvtion to get UV index, has to have separate API call
  function getUVIndex(lat, lon) {

    var currentUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`;

    $.ajax({
      url: currentUV,
      method: "GET",
      dataType: "json"
    }).then(function (response) {
      console.log(response);
      var uvI = response.value;
      console.log(uvI)

      $("#UV-index").text("UV Index: " + uvI);
      // creating function to change colors
      function uvColorChange() {
        if (uvI < 3) {
          $("#UV-index").css("color", "#66b447");
        } else if (uvI < 6) {

          $("#UV-index").css("color", "#ffd300");
        } else if (uvI < 9) {

          $("#UV-index").css("color", "#ff631c");
        } else {

          $("#UV-index").css("color", "#ff0800");
        }
      };
      uvColorChange();
    });

  }

  $(".list-group").on("click", "li", function () {
    cityInput = $(this).attr("data-city");
    console.log(cityInput)
    currentAPI(cityInput);
    fiveDayAPI();

  });

});