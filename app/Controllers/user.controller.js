const User = require('../Models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        user = new User({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            "randomString", {
            expiresIn: 10000
        },
            (err, token) => {
                if (err) throw err
                res.status(200).json({
                    token,
                    user
                })
            }
        )
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Error in Saving")
    }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({
            'email': req.body.email
        })
        if (!user)
            return res.status(400).json({
                message: "user Not Exist"
            })

        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            })

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err
                res.status(200).json({
                    token,
                })
            }
        )
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.getRankedUsers = async (req, res) => {
    try {
        let users = await User.find({})
        users.sort(compare)
        return res.send(users)
    } catch (err) {
        console.error(e)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

compare = (user1, user2) => {
    let comparaison = 0
    if (user1.points > user2.points) {
        comparaison = 1
    } else if (user1.points < user2.points) {
        comparaison = -1
    }
    return comparaison * -1
}