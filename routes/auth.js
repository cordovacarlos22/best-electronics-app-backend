const express = require("express");
const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJs = require('crypto-js')
//! end point for REGISTER
//? get users 
router.get("/userslist", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send({
    "users": users
  });
});

//? gets user by id 
//! * ocupo solucinar esto *
router.get("/usersbyid", async (req, res) => {
  try {
    console.log(req.user);
    const current = await User.findById(req.user.id);
    console.log(current);
    const users = await User.find();
    res.send({
      result: users
    });
  } catch (error) {
    console.error(error.message);
  }
});


//? Register 
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_JS_KEY
      ).toString(),
      
    });
    // newUser.hashPassword(req.body.password);
    const saveUser = await newUser.save();

    res.status(201).json({
      result: saveUser
    });
    console.info(saveUser);

  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

//! LOGIN



module.exports = router;