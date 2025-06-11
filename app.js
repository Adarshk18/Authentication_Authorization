const express = require("express");
const app = express();
const bcrypt = require("bcrypt");



// app.get("/",(req,res)=>{
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash("password",salt,(err,hash)=>{
//                 console.log(hash);
//         });
//     });

// });

//checking the pasword matches with the hash or not 
app.get("/", (req, res) => {
    bcrypt.compare("password", "$2b$10$GrOR1CM633ceZeCh2iUOCOUOkr/fMcgYA6P0NXsU52DxKJBo6iTDK", (err, result) => {
        console.log(result);
    });

})



app.listen(3000);