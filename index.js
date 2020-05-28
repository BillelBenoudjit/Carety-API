const express = require("express")
const app = express()
const body_parser = require("body-parser")

app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())

const port = process.env.PORT || 8000 
const routes = require("./app/Routes/routes")
routes(app)

/*const db = require("./app/Config/db")
db.InitiateMongoServer()*/

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})
