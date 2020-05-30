const { check, validationResult } = require("express-validator/check")
const userController = require("../Controllers/user.controller")

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.json("Welcome to our app API !")
    })
    //User routes
    app.post("/signup", userController.signup)
    app.post("/login", userController.login)
}