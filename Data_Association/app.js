const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/posts");


app.get("/",(req,res)=>{
    res.send("Hi");
});

app.get("/create",(req,res)=>{
    let user = userModel.create({
        username: "Adarsh",
        age: 24,
        email: "adarsh@gmail.com"
    });

    res.send(user);
})

app.listen(3000);