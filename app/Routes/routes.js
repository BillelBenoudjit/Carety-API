const { check, validationResult } = require("express-validator/check")
const userController = require("../Controllers/user.controller")
const auth = require("../Middleware/auth")

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.json("Welcome to our app API !")
    })
    //User routes
    app.post("/signup", userController.signup)
    app.post("/login", userController.login)
    app.put("/users/views", auth, userController.editUserViews)
    app.get("/users/rank", auth, userController.getRankedUsers)
    app.get("/users/profile", auth, userController.getUserProfile)
}