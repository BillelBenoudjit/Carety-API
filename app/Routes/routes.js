const { check, validationResult } = require("express-validator/check")

module.exports = (app) => {
    //Members routes

    app.get("/", (req, res) => {
        res.json("Welcome to our app API !")
    })
}