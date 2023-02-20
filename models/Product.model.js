const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    src: { type: String, required: true },
    title: { type: String, required: true},
    price: { type: Number, required: true },
    regprice: { type: Number, required: true },
    desc: { type: String, required: true },
    categories: { type: Array, required: true },
    href:{ type: String, required: true },

  },
  { timestamps: true }
);



const Product = mongoose.model('product', ProductSchema);

module.exports = Product;