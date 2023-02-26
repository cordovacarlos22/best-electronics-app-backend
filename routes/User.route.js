
const router = require("express").Router();
const User = require("../models/User.model");
const { validateAccess, validateAccessAndAdmin } = require("../middleware/authorization");


//? get all  users 
router.get("/userslist", validateAccess, async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send({
    "users": users
  });
});


//? delete user
router.delete("/:id",validateAccess,async(req,res)=>{
 try {
  await User.findOneAndDelete(req.params.id);
  res.status(200).json("user has been deleted..")
 } catch (error) {
   res.status(500).json(error);
 }
});

//? get user
router.get("/find/:id",validateAccessAndAdmin, async (req, res) => {
  try {
   const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json({others})
  } catch (error) {
    res.status(500).json(error);
  }
});

//? delete user
router.delete("/find/:id", validateAccessAndAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ others })
  } catch (error) {
    res.status(500).json(error);
  }
});



router.get("/account", validateAccess, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.send({
    "name": user.firstName,  
  });
})






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