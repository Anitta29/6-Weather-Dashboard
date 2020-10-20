// need to store my API key
$(document).ready(function () {

  var APIkey = "1454392d03a2419ff4eef4a809656678";

  // var currentDay = moment().format('MMMM Do YYYY, h:mm:ss a');
  // adding event listener to button-search

  $("button").on("click", function () {
    


    // grabbing users input and storing it
    var cityInput = $("#search-box").val();


    // building query URL link
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey

    var fivedayURL = "city namehttp://api.openweathermap.org/data/2.5/forecast?q={},{state code},{country code}&appid={API key}";


    // callig Ajax
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    
  });




  

  });
// here goes another function

});

// displaying info (temp, humidity etc), use jquery, append to HTML

// make another function for 5day call

// save searches at local storage (you need forloop, )