const express = require("express");
const app = express();
const bcrypt = require("bcrypt");



app.get("/",(req,res)=>{
    // res.cookie("name","adarsh");
    res.send("done");

});

app.get("/read",(req,res)=>{
 
    res.send("heyy");
    
});

app.listen(3000);