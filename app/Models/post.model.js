const Mongoose = require('mongoose')

var Schema = Mongoose.Schema

const postSchema = new Schema ({
    sponsor: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    videoUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0,
        required: true,
    },
})

const Post = Mongoose.model('Post', postSchema)

module.exports = Post