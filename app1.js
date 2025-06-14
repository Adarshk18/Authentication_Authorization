const express = require("express");
const app = express();
const userModel = require('./models/userModel');
const jwt = require('jsonwebtoken');

const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/create", (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                password: hash,
                age,
            })

            let token = jwt.sign({ email }, "secret");
            res.cookie("token", token);
            res.send(user);
        })
    })
});

app.get("/logout",(req,res)=>{
    
})

app.listen(3000);