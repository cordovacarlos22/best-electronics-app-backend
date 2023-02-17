//! server 

//? imports express
const express = require("express");
//? starts express
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const userRoute = require("./routes/User.route")

//? PORT CONFIG
const PORT = process.env.PORT
//? db connection config
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  try {
    console.info('DB Connection Successfull!')
  } catch (error) {
    console.error(error);
  };

 //! takes json 
 app.use(express.json());
 //? route to users
 app.use("/users",userRoute);
 
 

//! api test check end point
app.get("/api/test", (req, res) => {
  res.json({
    "res": "Server test passed"
  });
  console.info('server test passed')
})


app.listen(PORT || 3002,()=>{
  console.info(`server is running on ${PORT}`);
});