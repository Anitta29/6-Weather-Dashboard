// need to store my API key
$(document).ready(function () {

  var APIkey = "1454392d03a2419ff4eef4a809656678";

  $("#current-day").text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
  // adding event listener to button-search
  var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];

  $("#five-day").empty();
  $(".search").on("click", function (event) {
    event.preventDefault();

    // grabbing users input and storing it
    var cityInput = $("#search-box").val().trim();

    citySearches.push(cityInput)
    console.log(citySearches)

    localStorage.setItem("citySearches", JSON.stringify(citySearches));


    // building query URL link
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey + "&units=imperial"

    // callig Ajax

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

      // getUVIndex(response.coord.lat, response.coord.lon)
      // displaying info (temp, humidity etc), use jquery, append to HTML
      var cityDiv = $("#city").text(response.name);
      var tempDiv = $("#temp").text("Temperature: " + response.main.temp + "F");
      var weathDiv = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      var humidDiv = $("#humidity").text("Humidity: " + response.main.humidity + "%");
      var windDiv = $("#wind-speed").text("Wind-speed: " + response.wind.speed);
      // var uvIndex = $("#UV-index").text("UV-Index: " + response)
      $("#weather").html(weathDiv)


      searchHistory();
      getUVIndex(response.coord.lat, response.coord.lon)
    });

  
  });

  var fiveDays = [];

  // here goes another function for 5 day call
  $(".search").on("click", function (event) {
    event.preventDefault();

    // grabbing users input and storing it
    var cityInput = $("#search-box").val().trim();

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

        // console.log(dateTime)
        // if time string includes noon put entire object in five day array
        if (dateTime.includes("12:00:00")) {
          fiveDay.push(results[i])
        }
      }

      console.log(fiveDay)

      moment(fiveDay[0].dt_txt).format('MMMM Do YYYY')

      var dayoneDiv = $("<div>")
      
      var date = $("<p>").text(moment(fiveDay[0].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[0].main.temp + "F");
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[0].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[0].main.humidity + "%")
      dayoneDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title1").empty().prepend(dayoneDiv)

      var daytwoDiv = $("<div>")
      
      var date = $("<p>").text(moment(fiveDay[1].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[1].main.temp + "F");
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[1].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[1].main.humidity + "%")
      daytwoDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title2").empty().prepend(daytwoDiv)

      var daytriDiv = $("<div>")
      
      var date = $("<p>").text(moment(fiveDay[2].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[2].main.temp + "F");
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[2].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[2].main.humidity + "%")
      daytriDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title3").empty().prepend(daytriDiv)

      var dayfoDiv = $("<div>")
      
      var date = $("<p>").text(moment(fiveDay[3].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[3].main.temp + "F");
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[3].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[3].main.humidity + "%")
      dayfoDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title4").empty().prepend(dayfoDiv)

      var dayfiDiv = $("<div>")
      
      var date = $("<p>").text(moment(fiveDay[4].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[4].main.temp + "F");
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[4].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[4].main.humidity + "%")
      dayfiDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title5").empty().prepend(dayfiDiv)

    })

  });

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
      var aTag = $("<a>");
  
      li.addClass("list-group-item");
      aTag.addClass("p-2").attr("href", "#").attr("id", citySearches[i])
      aTag.text(citySearches[i])
      li.append(aTag)

      $(".list-group").prepend(li);

    }

  }
  searchHistory();

  
  function getUVIndex(lat, lon) {
    // var lat = response.coord.lat
    // var lon = response.coord.lon

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
    });

  
  }

  $(".list-group").on("click", "li", function(){
var city = $(this).attr("data-name");
searchHistory(city)

  })
 

});

// UV index and colors

// grad the value of attr and run another ajax call