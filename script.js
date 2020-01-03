
$(document).ready(function () {
    makeLiHistory();
});

var currentDay = moment().format('L')

$("#searchBtn").on("click", function (event) {
    fiveDayForecast();
    clear();
    today();
    historyShow();
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
        searchParam + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

  
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

    var APIKey2 = "212ce54622309764f1223ca412134b53";
    var searchParam2 = $("#location")
        .val()
        .trim();
    // Here we are building the URL we need to query the database
    var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + searchParam2 +"&units=imperial&appid=" + APIKey2;

    
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response2) { 

        var dataday=" ";
        var item=0;

        for (let index = 0; index < 40; index++) {

            var data=response2.list[index].dt_txt;

            if ( (dataday!="")  &&  (data.substr(0,10)!=dataday)) {

                dataday=data.substr(0,10);
                var weatherList = $("<ul class='content is-info'>");
                var city = $("<li>" + "<h1 class= 'title'>" +" " +response2.list[index].dt_txt + " " +"</h1>" +  " " + "</li");
                var imgc = $("<li>" + "<span>" + " "+ "</span>" + "<img id=\"theImg\" src=\"http://openweathermap.org/img/wn/"+response2.list[index].weather[0].icon+"@2x.png\">" + "</span>" +"</li>");
                var description = $("<li>" + "<span>" + "  " + response2.list[index].weather[0].description  + "</span>" + "</li>");
                var temp = $("<li>" + "<span>" + "Temperature: " + response2.list[index].main.temp + " &#8457" + "</span>" + "</li>");
                var humid = $("<li>" + "<span>" + "Humidity: " + response2.list[index].main.humidity + " %" + "</span>" + "</li>");  
        
                $("#day"+item).append(weatherList);
                weatherList.append(city, imgc, description, temp, humid);
                
                item++;
        
            }

        }//for

    });
};


var historyArr = [];



//history
function historyShow() {

    var cityclick = $("#location").val();

    if (localStorage.getItem("historyArrl") === null) {

        historyArr=[cityclick];
        localStorage.setItem("historyArrl",JSON.stringify(historyArr));


    } else  {
        var valueLS = JSON.parse(localStorage.getItem("historyArrl"));
         historyArr=valueLS;  

        if (historyArr.length==5) {
            historyArr.shift();
        }
        historyArr.push(cityclick);
        localStorage.setItem("historyArrl",JSON.stringify(historyArr));

    }


 //create li
 
 makeLiHistory();

  
}//history


function makeLiHistory(params) {

    var valueLS = JSON.parse(localStorage.getItem("historyArrl"));
    historyArr=valueLS;
    $("#historyItem").empty();

    for (var i = 0; i < historyArr.length; i++){ 
        var li= $("<li>" + "<span>" + historyArr[i] +"</span>" + "</li>");  
        $("#historyItem").prepend(li);  
    }    
}


// Function to empty out the currentWeather div
function clear() {
    $("#currentWeather").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day0").empty();
}



 