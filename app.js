//jshint esversion : 6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); // use to read body of target file
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, resp) {
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "ee0147535c4564bf3fb1bd73f2c8de6c#";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      // //console.log(data); // data hexcode
      const weatherData = JSON.parse(data); // get data as javascript object
      // //console.log(weatherData);

      // // const object = {
      // //   name: "Kenny",
      // //   favColour: "Blue"
      // // };
      // // console.log(JSON.stringify(object));  // JSON.stringify
      // //
      const temp = weatherData.main.temp; // TEMP:
      const feelsLike = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      resp.write("<h1>The current temperature in " + query + " is " + temp + " degrees Celcius.</h1> ");
      resp.write("<h2> Weather description: " + weatherDescription + "</h2>");
      resp.write("<h3> Feels like: " + feelsLike + "</h3>");
      resp.write("<img src=" + imageUrl + ">");
      resp.send();
    });
  });
});



app.listen(3000, function() {
  console.log("server is up on port 3000");
});
