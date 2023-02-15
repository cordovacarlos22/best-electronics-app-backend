
const router = require("express").Router();

const User = require("../models/User.model");


//!user test end point
router.get("/usertest", (req, res) => {
  res.send("user test is passed");
});

//!user post test end point
router.post("/userposttest", (req, res) => {
  const username = req.body.username;

  console.info(username);

  res.send({
    "username": username
  });
});


//---------------------- //

//! end point to get user by id
router.get('/id', async (req, res) => {
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



//! end point to register user
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
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


//! end poind to find user account by id 
router.get("/account", async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send({
    "name": user.firstName,
    "lastname": user.lastName,
    "dateofbird": user.dateOfBirth
  });

  
});

module.exports = router;