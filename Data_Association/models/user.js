const mongoose = require("mongoose");

mongoose.connect("https://127.0.0.1:27017/newdb");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        }
    ]
})

module.exports = mongoose.model("user", userSchema);