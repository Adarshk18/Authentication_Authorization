const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// app.get("/",(req,res)=>{
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash("password",salt,(err,hash)=>{
//                 console.log(hash);
//         });
//     });

// });

//checking the pasword matches with the hash or not 
// app.get("/", (req, res) => {
//     bcrypt.compare("password", "$2b$10$GrOR1CM633ceZeCh2iUOCOUOkr/fMcgYA6P0NXsU52DxKJBo6iTDK", (err, result) => {
//         console.log(result);
//     });

// });

//JWT 

app.get("/",(req,res)=>{
    let token = jwt.sign({email: "adarsh@gmail.com"},"secret");
    res.cookie("token",token);
    res.send("done");
});

app.get("/read",(req,res)=>{
    //extractiong the data
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
})



app.listen(3000);