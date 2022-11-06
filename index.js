const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+ "/index.html");
    

    
});

app.post("/", function(req,res){
    const cityN = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityN + "&appid=2d32724f40de70e5a16f4164596cb191&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<h1>Temperature of " + cityN + " is " + temp + "  </h1>")
            res.write("<p> Description of " + cityN + " is " + description + "</p>")
            res.write("<img src=" + imageUrl + "></img>")
            res.send();
            
        })

    })

})


app.listen(3000, function(){
    console.log("server started at port 3000");
})