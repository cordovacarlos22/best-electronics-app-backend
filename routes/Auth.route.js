const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { validateAccess, generateToken } = require("../middleware/authorization");


//! end point to register user
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    newUser.hashPassword(req.body.password);
    await newUser.save();
    res.json({
      result: newUser
    });

  } catch (err) {
    console.error(err.message);
  }
});

//! route or end point to /user/login does login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ "username": username });
    if (user) {
      if (user.validatePassword(password)) {
        const token = generateToken({
          id: user.id,
          name: user.firstName
        });
        res.json({
          result: token
        });

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

//! end pont to update user password
router.put("/updatepassword/:id", validateAccess, async (req, res) => {

  try {

    const newUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    newUser.hashPassword(req.body.password);
    await newUser.save();
    res.status(200).json(newUser);
  }


  catch (error) {
    res.status(500).json(error);
  }
});

//! end pont to update user password
router.put("/updateuser/:id", validateAccess, async (req, res) => {

  try {

    const newUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    
    await newUser.save();
    res.status(200).json(newUser);
  }


  catch (error) {
    res.status(500).json(error);
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