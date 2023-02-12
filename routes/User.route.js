const router = require("express").Router();

//!user test end point
router.get("/usertest",(req,res)=>{
  res.send("user test is passed");
});



//!user test end point
router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  
  console.info(username);

  res.send({
    "username": username
  });
});



module.exports = router;