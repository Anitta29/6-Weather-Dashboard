// need to store my API key
$(document).ready(function () {

  var APIkey = "1454392d03a2419ff4eef4a809656678";
  var currentUV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}";
  $("#current-day").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  // adding event listener to button-search

  $("button").on("click", function () {



    // grabbing users input and storing it
    var cityInput = $("#search-box").val();


    // building query URL link
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey

    // callig Ajax

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

      // displaying info (temp, humidity etc), use jquery, append to HTML
      var cityDiv = $("#city").text("Current city: " + response.name);
      var tempDiv = $("#temp").text("Temperature: " + response.main.temp);
      var weathDiv = $("#weather").text("Weather: " + response.weather[0].main);
      var humidDiv = $("#humidity").text("Humidity: " + response.main.humidity  + "%");
      var windDiv = $("#wind-speed").text("Wind-speed: " + response.wind.speed);
      var uvIndex = $("#UV-index").text("UV-Index: " + response)
    });

  });

  var fiveDays = [];


  // here goes another function for 5 day call
  $("button").on("click", function () {

    // grabbing users input and storing it
    var cityInput = $("#search-box").val();
    // cities.push(cityInput)
    var fivedayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIkey

    $.ajax({
      url: fivedayURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);


      $("#five-day").empty();

      var results = response.list;
      console.log(results);
      for (var i = 0; i < 5; i++) {

        // Creating and storing a div tag
        var dayoneDiv = $("<div>");

        //results[0].main.temp
        //results[1].main.temp
        //results[2].main.temp
        //results[i]
        
        var p = $("<p>").text("Temp: " + results[i].main.temp);
        dayoneDiv.append(p)

        $("#five-day").append(dayoneDiv)


      }

      // displaying info (temp, humidity etc), use jquery, append to HTML

      // var fiveDays = [];
      // for (var i = 0; i < 5; i++);

      // var tempDiv = $("#card-title").html("Temperature: " + response.main.temp);
      // var weathDiv = $("#weather").text("Weather: " + response.weather[0].main);
      // var humidDiv = $("#humidity").text("Humidity: " + response.main.humidity);
      // var windDiv = $("#wind-speed").text("Wind-speed: " + response.wind.speed);
      // var uvIndex = $("#UV-index").text("UV-Index: " + reponse)
    })
  });
});




// save searches at local storage and display them in search bar

// convert Kelvin to Farenheit

// make clear button