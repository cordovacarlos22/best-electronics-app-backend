const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },

  },
  { timestamps: true }
);



const Product = mongoose.model('product', ProductSchema);

module.exports = Product;