const router = require("express").Router();

//!user test end point
router.get("/productgetcheck", (req, res) => {
  res.send("user test is passed");
});


// ------------------------//

//! products end points 







module.exports = router;