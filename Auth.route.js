const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { validateAccess } = require("../middleware/authorization");



//! route or end point to /user/login does login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ "username": username });
    if (user) {
      if (user.validatePassword(password)) {

        const accessToken = jwt.sign({
          id: user._id,
          isAdmin: user.isAdmin,
          username: user.username
        }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d"
        });

        //! passes all inputs but password
        const { password, ...others } = user._doc;
        res.status(201).json({...others,accessToken})
        
      } else {
        res.status(401)
        res.json({
          result: "Password does not match"
        });
      }
    } else {
      res.status(401);
      res.json({
        result: `User ${username} not found`
      });
    }

  } catch (error) {
    console.error(error.message);
  }
});

//! not done 
router.post('/logout', async (req, res) => {
  try {
    // marcar el token como expirado


  } catch (error) {
    console.error(error.message);
  }
});


router.post("/admin", validateAccess, async (req, res) => {

  try {
    res.status(201)
    res.json({
      admin: "yes",
    });


  } catch (error) {
    res.status(500).json(error)
    res.json(error);
    console.error(error)
  }

});

module.exports = router