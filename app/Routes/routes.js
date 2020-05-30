const { check, validationResult } = require("express-validator/check")

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.json("Welcome to our app API !")
    })
}