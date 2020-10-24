// need to store my API key
$(document).ready(function () {

  var APIkey = "1454392d03a2419ff4eef4a809656678";
  var currentUV = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}";
  $("#current-day").text(moment().format('MMMM Do YYYY'));
  // adding event listener to button-search
  var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];

  $("#five-day").empty();
  $("button").on("click", function () {


    // grabbing users input and storing it
    var cityInput = $("#search-box").val();

    citySearches.push(cityInput)
    console.log(citySearches)

    localStorage.setItem("citySearches", JSON.stringify(citySearches))


    // building query URL link
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey + "&units=imperial"

    // callig Ajax

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

      // displaying info (temp, humidity etc), use jquery, append to HTML
      var cityDiv = $("#city").text(response.name);
      var tempDiv = $("#temp").text("Temperature: " + response.main.temp);
      var weathDiv = $("#weather").text("Weather: " + response.weather[0].icon);
      var humidDiv = $("#humidity").text("Humidity: " + response.main.humidity + "%");
      var windDiv = $("#wind-speed").text("Wind-speed: " + response.wind.speed);
      var uvIndex = $("#UV-index").text("UV-Index: " + response)

    });


  });

  var fiveDays = [];


  // here goes another function for 5 day call
  $("button").on("click", function () {

    // grabbing users input and storing it
    var cityInput = $("#search-box").val();

    var fivedayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIkey + "&units=imperial"

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


      // loop through five array and print each item to the page

      // for (var i = 0; i < 5; i++) {

      // Creating and storing a div tag

      moment(fiveDay[0].dt_txt).format('MMMM Do YYYY')
      var dayoneDiv = $("<div>")
      var date = $("<p>").text(moment(fiveDay[0].dt_txt).format('MMMM Do YYYY'));
      var pTemp = $("<p>").text("Temp: " + fiveDay[0].main.temp);
      var pWeath = $("<p>").text("Weather: " + fiveDay[0].weather[0].icon)
      var pHumid = $("<p>").text("Humidity: " + fiveDay[0].main.humidity + "%")
      dayoneDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title1").append(dayoneDiv)

      var daytwoDiv = $("<div>")
      var date = $("<p>").text(fiveDay[1].dt_txt);
      var pTemp = $("<p>").text("Temp: " + fiveDay[1].main.temp);
      var pWeath = $("<p>").text("Weather: " + fiveDay[1].weather[0].icon)
      var pHumid = $("<p>").text("Humidity: " + fiveDay[1].main.humidity + "%")
      daytwoDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title2").append(daytwoDiv)

      var daytriDiv = $("<div>")
      var date = $("<p>").text(fiveDay[2].dt_txt);
      var pTemp = $("<p>").text("Temp: " + fiveDay[2].main.temp);
      var pWeath = $("<p>").text("Weather: " + fiveDay[2].weather[0].icon)
      var pHumid = $("<p>").text("Humidity: " + fiveDay[2].main.humidity + "%")
      daytriDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title3").append(daytriDiv)

      var dayfoDiv = $("<div>")
      var date = $("<p>").text(fiveDay[3].dt_txt);
      var pTemp = $("<p>").text("Temp: " + fiveDay[3].main.temp);
      var pWeath = $("<img>").attr("src", "http://openweathermap.org/img/w/" + fiveDay[3].weather[0].icon + ".png")
      var pHumid = $("<p>").text("Humidity: " + fiveDay[3].main.humidity + "%")
      dayfoDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title4").append(dayfoDiv)

      var dayfiDiv = $("<div>")
      var date = $("<p>").text(fiveDay[4].dt_txt);
      var pTemp = $("<p>").text("Temp: " + fiveDay[4].main.temp);
      var pWeath = $("<p>").text("Weather: " + fiveDay[4].weather[0].icon)
      var pHumid = $("<p>").text("Humidity: " + fiveDay[4].main.humidity + "%")
      dayfiDiv.append(date, pTemp, pWeath, pHumid)
      $("#card-title5").append(dayfiDiv)

    })
  });


  $("#clear").on("click", function () {

    $(".card-body").empty();
    $(".location").empty();
    // $("#search-box").empty();
    $("#search-box").val()
    $("#list-grouo").empty();


  })

  // creating function for search history

  function searchHistory(array) {



    for (const element of array) {
      var li = $("<li>");
      var aTag = $("<a>");

      console.log(element)
      li.addClass("list-group-item");
      aTag.addClass("p-2").attr("href", "#")
      aTag.text(element)
      $("#list-group").append(li)
      li.append(aTag)

    }

    console.log(array)



  }
  searchHistory(citySearches);


  // var getPastSearches = JSON.parse(localStorage.getItem("citySearches")) || [];
  // console.log(getPastSearches)

  //grab items from local storage and prepend onto page
  //$("#card1").prepend(getpastsearches[1])

});




// save searches at local storage and display them in search bar!!!!!!!!!

// convert Kelvin to Farenheit

// make icons for weather

// UV index and colors

// make clear button