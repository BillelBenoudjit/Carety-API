const Mongoose = require('mongoose')

var Schema = Mongoose.Schema

const objectiveSchema = new Schema ({
    objectiveName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true 
    },
    views: {
        type: Number,
        default: 0,
        required: true,
    },
    necessaryViews: {
        type: Number,
        default: 0,
        required: true,
    },
    achieved: {
        type: Boolean,
        default: false,
        required: true
    },
    country: {
        type: String,
        default: "Algeria",
        required: true
    }
})

const Objective = Mongoose.model('Objective', objectiveSchema)

module.exports = Objective