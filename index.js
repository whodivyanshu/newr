const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res){

    res.sendFile(__dirname,"\index.html");

    
    
});


app.listen(3000, function(){
    console.log("server started at port 3000");
})