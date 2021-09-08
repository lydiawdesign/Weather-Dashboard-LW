$(document).ready(function () {

  
  var NowMoment = moment().format("l");
  var city;
  var cities;
  
 //function to load most recently searched city from local storage
  function loadRecent() {
    var lastSearch = localStorage.getItem("Recent");
    if (lastSearch) {
      city = lastSearch;
      search();
    } else {
      city = "Chicago";
      search();
    }
  }

  loadRecent()

  //function to retrieve user inputted city name
  function getCity() {
    city = $("#searchSubmit").val();
    if (city && cities.includes(city) === false) {
      saveToLocalStorage();
      return city;
    } else if (!city) {
      alert("Please enter a valid city");
    }
  }

  // getting the current city weather informaiton
  function search() {
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=8eadd76ba5e69911b753586cfe50390f";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      var nameOfCity = response.name;
      var temp = response.main.temp;
      var cityHumid = response.main.humidity;
      var wind = response.wind.speed;
      var icon = response.weather[0].icon;


      $("#icon").html(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
      );
      $("#cityResult").html(nameOfCity + " " + "(" + NowMoment + ")");
      $("#temp").text("Temperature: " + temp.toFixed(1));
      $("#wind").text("Wind: " + wind + " mph");
      $("#humidity").text("Humidity: " + cityHumid + "%");
      
      $("#date1").text(day1);
      $("#date2").text(day2);
      $("#date3").text(day3);
      $("#date4").text(day4);
      $("#date5").text(day5);

      getForecast(response.coord.lat, response.coord.lon);
    });

      //adds days to moment for forecast
    var day1 = moment().add(1, "days").format("l");
    var day2 = moment().add(2, "days").format("l");
    var day3 = moment().add(3, "days").format("l");
    var day4 = moment().add(4, "days").format("l");
    var day5 = moment().add(5, "days").format("l");

    //Function to get 5-day forecast and then prints them on page under the current day weather
    function getForecast(lat, lon) {
     
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=8eadd76ba5e69911b753586cfe50390f",
        method: "GET",
      }).then(function (response) {

        //forecast temp variables
        var day1temp = response.daily[1].temp.max;
        var day2temp = response.daily[2].temp.max;
        var day3temp = response.daily[3].temp.max;
        var day4temp = response.daily[4].temp.max;
        var day5temp = response.daily[5].temp.max;

        //forecast weather icon variables
        var icon1 = response.daily[1].weather[0].icon;
        var icon2 = response.daily[2].weather[0].icon;
        var icon3 = response.daily[3].weather[0].icon;
        var icon4 = response.daily[4].weather[0].icon;
        var icon5 = response.daily[5].weather[0].icon;
        //
        $("#temp1").text("temperature:" + " " + day1temp.toFixed(1));
        $("#temp2").text("temperature:" + " " + day2temp.toFixed(1));
        $("#temp3").text("temperature:" + " " + day3temp.toFixed(1));
        $("#temp4").text("temperature:" + " " + day4temp.toFixed(1));
        $("#temp5").text("temperature:" + " " + day5temp.toFixed(1));

  
        $("#icon1").html(
          `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
        );
        $("#icon2").html(
          `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
        );
        $("#icon3").html(
          `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
        );
        $("#icon4").html(
          `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
        );
        $("#icon5").html(
          `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
        );
      });
    }
  }

//event handler for recently searched cities in table
  $(document).on("click", "td", function(event) {
    event.preventDefault();
    var citySearched = $(event.target).text();
    city = citySearched;
  });
});
