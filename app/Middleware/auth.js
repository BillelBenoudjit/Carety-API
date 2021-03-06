const jwt = require('jsonwebtoken')
const User = require('../Models/user.model')

module.exports = function(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '')
    //const token = tokens
    if (!token) return res.status(401).json({ message: "Auth Error" });
  
    try {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded.user;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }
  };
