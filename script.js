
// $(document).ready(function () {
  

//   $("#searchBtn").on("click", function(event) {
//   // This is our API key
//     //var APIKey = "166a433c57516f51dfab1f7edaed8413";
//     var APIKey = "212ce54622309764f1223ca412134b53";
//     var searchParam = $("#location")
//     .val()
//     .trim();

//     // Here we are building the URL we need to query the database
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//       "q="+searchParam+"&units=imperial&appid=" + APIKey;

//     // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // We store all of the retrieved data inside of an object called "response"
//       .then(function(response) {

//         // Log the queryURL
//         console.log(queryURL);

//         // Log the resulting object
//         console.log(response);

//         // Transfer content to HTML
//         $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//         $(".wind").text("Wind Speed: " + response.wind.speed);
//         $(".humidity").text("Humidity: " + response.main.humidity);
//         $(".temp").text("Temperature (F) " + response.main.temp);

//         // Converts the temp to Kelvin with the below formula
//         var tempF = (response.main.temp - 273.15) * 1.80 + 32;
//         $(".tempF").text("Temperature (Kelvin) " + tempF);

//         // Log the data in the console as well
//         console.log("Wind Speed: " + response.wind.speed);
//         console.log("Humidity: " + response.main.humidity);
//         console.log("Temperature (F): " + response.main.temp);
//       });

//  });
// });








var currentDay = moment().format('L')
$("#searchBtn").on("click", function (event) {


  

  fiveDayForecast();

    clear();
    today();
});

$("#location").on("keypress", function (e) {
    if (e.which === 13) {
        clear();
        today(); 
        fiveDayForecast();
    };
});

function today(){

    var APIKey = "212ce54622309764f1223ca412134b53";
    var searchParam = $("#location")
        .val()
        .trim();
    // Here we are building the URL we need to query the database
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchParam +
        "&units=imperial&appid=" +
        APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);

        console.log(response);


        var weatherList = $("<ul class='box content'>");


 

        var city = $("<li>" + "<h1 class= 'title'>" + response.name + " " + "(" + currentDay + ") "+  response.weather[0].main  +"</h1>" +  " " + "</li");

        //imagen
 

        var imgc = $("<li>" + "<span>" + " "+ "</span>" +         
        //imagen aqui
         "<img id=\"theImg\" src=\"http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png\">" + "</span>" +"</li>");

         var description = $("<li>" + "<span>" + "  " + response.weather[0].description  + "</span>" + "</li>");


        var temp = $("<li>" + "<span>" + "Temperature: " + response.main.temp + " &#8457" + "</span>" + "</li>");
        var humid = $("<li>" + "<span>" + "Humidity: " + response.main.humidity + " %" + "</span>" + "</li>");
        var wind = $("<li>" + "<span>" + "Wind Speed: " + response.wind.speed + " mph" + "</span>" + "</li>");
       

        $("#currentWeather").append(weatherList);
        weatherList.append(city, imgc, description, temp, humid, wind);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
            method: "GET"
        }).then(function (uvi) {
            console.log(uvi);
            var uvIVal = uvi.value;
            var uv = $("<li>" + "<span>" + "UV Index: " + "<span>" + uvIVal + "</span>" + "</span>" + "</li>");
            weatherList.append(uv);
            if (uvIVal < 3) {
                $(uv).css({"background-color": "green", "color": "white"})
            } else if (uvIVal >= 3 && uvIVal < 6 ) {
                $(uv).css({"background-color": "yellow", "color": "black"})
            } else if (uvIVal >= 6 && uvIVal < 8){
                $(uv).css({"background-color": "orange", "color": "white"})
            } else if (uvIVal >= 8 && uvIVal < 11) {
                $(uv).css({"background-color": "red", "color": "white"})
            } else {
                $(uv).css({"background-color": "purple", "color": "white"})
            }
        });
    });
};

function fiveDayForecast(){


  var APIKey = "212ce54622309764f1223ca412134b53";
  var searchParam = $("#location")
      .val()
      .trim();
  // Here we are building the URL we need to query the database
  var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchParam +"&units=imperial&cnt=5&appid=" + APIKey;
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function (response2) {
    console.log(queryURL);
    console.log(response2);


  });
};
















  // api.openweathermap.org/data/2.5/weather?q=London






 
// Function to empty out the currentWeather div
function clear() {
    $("#currentWeather").empty();
}



// {"cod":"200","message":0,"cnt":5,"list":[
//   {"dt":1577696400,"main":{"temp":21.29,"feels_like":16.16,"temp_min":11.77,"temp_max":21.29,"pressure":1027,"sea_level":1027,"grnd_level":781,"humidity":94,"temp_kf":5.29},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":100},"wind":{"speed":0.2,"deg":207},"snow":{"3h":0.25},"sys":{"pod":"n"},"dt_txt":"2019-12-30 09:00:00"},
//   {"dt":1577707200,"main":{"temp":19.31,"feels_like":13.64,"temp_min":12.16,"temp_max":19.31,"pressure":1028,"sea_level":1028,"grnd_level":781,"humidity":93,"temp_kf":3.97},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":100},"wind":{"speed":0.83,"deg":349},"snow":{"3h":0.13},"sys":{"pod":"n"},"dt_txt":"2019-12-30 12:00:00"},
//   {"dt":1577718000,"main":{"temp":16.45,"feels_like":10.02,"temp_min":11.7,"temp_max":16.45,"pressure":1029,"sea_level":1029,"grnd_level":782,"humidity":92,"temp_kf":2.64},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":100},"wind":{"speed":1.7,"deg":16},"snow":{"3h":0.06},"sys":{"pod":"d"},"dt_txt":"2019-12-30 15:00:00"},
//   {"dt":1577728800,"main":{"temp":23.11,"feels_like":17.78,"temp_min":20.73,"temp_max":23.11,"pressure":1029,"sea_level":1029,"grnd_level":783,"humidity":88,"temp_kf":1.32},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":0.6,"deg":116},"sys":{"pod":"d"},"dt_txt":"2019-12-30 18:00:00"},
//   {"dt":1577739600,"main":{"temp":23.83,"feels_like":18.34,"temp_min":23.83,"temp_max":23.83,"pressure":1026,"sea_level":1026,"grnd_level":782,"humidity":90,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":1.12,"deg":142},"sys":{"pod":"d"},"dt_txt":"2019-12-30 21:00:00"}],
//   "city":{"id":5779334,"name":"Orem","coord":{"lat":40.2972,"lon":-111.695},"country":"US","population":88328,"timezone":-25200,"sunrise":1577630936,"sunset":1577664500}}