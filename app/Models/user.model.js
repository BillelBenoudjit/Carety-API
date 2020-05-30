const Mongoose = require('mongoose')

var Schema = Mongoose.Schema

const userSchema = new Schema ({
    password : {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required: true,
    },
    userName : {
        type : String,
        required : true
    },
    views : {
        type : Number,
        required : true,
        default: 0,
    },
    points : {
        type : Number,
        required : true,
        default: 0
    }
})

const User = Mongoose.model('User', userSchema)

module.exports = User