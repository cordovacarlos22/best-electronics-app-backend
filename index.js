//! creates server 
//? imports express
const express = require("express");
const cors = require("cors");
//? starts express
const app = express();
//? import mongoose
const mongoose = require("mongoose");
//? import dotenv
require('dotenv').config();
//* import userRouter
const userRoute = require("./routes/User.route");
//* imports SliderRouter
const SliderRoute = require("./routes/Slider.route");
//* imports authRoute
const authRoute = require('./routes/Auth.route');
//* imports Product
const productRoute = require('./routes/Product.route');
//* imports Cart
const cartRoute = require('./routes/Cart.route');
//* imports Product
const orderRoute = require('./routes/Order.route');

//?  CONFIG FOR SERVER PORT
const PORT = process.env.PORT

//? db connection config using mongoose
mongoose.set("strictQuery", false);
//! connects to db and says a console log
mongoose.connect(process.env.MONGO_URL)
try {
  console.info('DB Connection Successfull!')
} catch (error) {
  console.error(error);
};

//! takes json  as param
app.use(express.json());
app.use(cors());
//? route to userstest
app.use("/userstest", userRoute);
//? route to users
app.use("/users",userRoute);
//?route to auth
app.use("/auth", authRoute);
//? route to sliders
app.use("/slider", SliderRoute);
//?route to product
app.use("/products",productRoute);
//?route to cart
app.use("/carts", cartRoute);
//?route to order
app.use("/orders", orderRoute);

//! api test check end point
app.get("/api/test", (req, res) => {
  res.json({
    "res": "Server test passed"
  });
  console.info('server test passed')
})

//* listens to port where server is running => 
//! has port 3001 as backup
//* console.info that server is running
app.listen(PORT || 3001, () => {
  console.info(`server is running on ${PORT}`);
});