const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/posts");


app.get("/",(req,res)=>{
    res.send("Hi");
});

app.get("/create", async(req,res)=>{
    let user = await userModel.create({
        username: "Adarsh",
        age: 24,
        email: "adarsh@gmail.com"
    });

    res.send(user);
})

app.get("/post/create", async(req,res)=>{
    let post = await postModel.create({
        postData: "Hello",
        user: "",
    })

    let user = await userModel.findOne({_id: ""});
    res.send(post);
});


app.listen(3000);