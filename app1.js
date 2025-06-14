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



app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    

    let user = await userModel.findOne({ email: req.body.email });
    
    console.log(user);

    if(!user){
        res.status(404).send({message: "Something went wrong."}); //if we writes user does not exists then malicious attacker will know the user does not exists the  they will try with diff one

    }

    bcrypt.compare(req.body.password, user.password , (err,result)=>{
        if(result){
            let token = jwt.sign({email: user.email}, "fgfgfg");
            res.cookie("token",token);
            res.status(200).send({message: "logged in successfully.."});
        }
        res.status(404).send({error: "Not authorized.."})
    });


})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.render("/");
})

app.listen(3000);