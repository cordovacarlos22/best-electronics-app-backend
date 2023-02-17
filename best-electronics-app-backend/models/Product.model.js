const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    src: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    regprice: { type: String, required: true },
    desc: { type: String, required: true },
    categories: { type: String, required: true },
    href:{ type: String, required: true },

  },
  { timestamps: true }
);



const Product = mongoose.model('product', ProductSchema);

module.exports = Product;