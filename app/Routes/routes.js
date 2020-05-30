const { check, validationResult } = require("express-validator/check")
const userController = require("../Controllers/user.controller")
const objectiveController = require("../Controllers/objective.controller")
const postController = require("../Controllers/post.controller")
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
    //Objective routes
    app.post("/objectives/add", objectiveController.addObjective)
    app.get("/objectives", objectiveController.getObjectives)
    app.put("/objectives/edit/:id", objectiveController.editObjectiveviews)
    app.delete("/objectives/delete/:id", objectiveController.deleteObjective)
    app.get("/objectives/nearToreachObjectives", objectiveController.getNearToReachObjective)
    app.get("/objectives/importantObjectives", objectiveController.getImportantObjectives)
    app.get("/objectives/countryObjectives/:country", objectiveController.getCountryObjectives)
    //Ads routes
    app.post("/ads/add", postController.addPost)
    app.get("/ads", postController.getPosts)
    app.put("/ads/edit/:id", postController.editPostViews)
    app.delete("/ads/delete/:id", postController.deletePost)
}