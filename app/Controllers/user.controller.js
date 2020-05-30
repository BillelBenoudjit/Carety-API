const User = require('../Models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Joi = require('joi')

exports.signup = async (req, res) => {
  const userSchema = Joi.object().keys({
    email: Joi.string().required().email().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
    password: Joi.string().required().min(8).max(72),
    userName: Joi.string().alphanum().min(3).max(30).required(),
  })

  const body = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName
  }

  const result = Joi.validate(body, userSchema);

  const { error } = result;
  const valid = error == null;

  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body
    })
  }
  
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({
      msg: "Email already used !"
    })
  }
  user = await User.findOne({ userName: req.body.userName })
  if (user) {
    return res.status(400).json({
      msg: "User Name already used !"
    })
  }

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
  const userSchema = Joi.object().keys({
    email: Joi.string().required().email().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
    password: Joi.string().required().min(8).max(72),
  })

  const body = {
    email: req.body.email,
    password: req.body.password
  }

  const result = Joi.validate(body, userSchema);

  const { error } = result;
  const valid = error == null;

  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body
    })
  }
  
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

exports.editUserViews = async (req, res) => {
  let user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({
      msg: "User not exist !"
    })
  }
  try {
    user.views = user.views + parseInt(req.body.numberViews)
    user.points = user.points + parseInt(req.body.time)
    await user.save()
    return res.status(200).json({
      msg: "User wiews and points edited"
    })
  } catch (err) {
    return res.status(400).json({
      msg: "Error in editing",
      err: err.message
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

exports.getUserProfile = async (req, res) => {
  let user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({
      msg: "User not exist !"
    })
  }
  try {
    return res.send(user)
  } catch (err) {
    return res.status(500).json({
      msg: "Server Error",
      err: err.message
    })
  }
}