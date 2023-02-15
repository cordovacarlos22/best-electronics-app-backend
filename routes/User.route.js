
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

//! end point for user 

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
      password:req.body.password,
    });
    // newUser.hashPassword(req.body.password);
    await newUser.save();
    res.json({
      result: newUser
    });

  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;