
const router = require("express").Router();

const User = require("../models/User.model");
const { validateAccess } = require("../middleware/authorization");


//? get users 
router.get("/userslist", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send({
    "users": users
  });
});






//---------------------- //





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

module.exports = router;