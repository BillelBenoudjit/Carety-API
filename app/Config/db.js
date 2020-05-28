// db.js

const mongoose = require("mongoose")
const {dbUsername, dbPassword, dbName} = require("../Config/config")

const dbConnectionUrl = ``

exports.InitiateMongoServer = async () => {
    try {
        await mongoose.connect(dbConnectionUrl, {
            useNewUrlParser: true
        });

        console.log("Connected to DB !!")
    } catch (e) {
        console.log(e);
        throw e;
    }
};