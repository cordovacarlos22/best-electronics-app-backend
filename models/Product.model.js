const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    src: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    regprice: { type: String, required: true },
    desc: { type: String, required: true },
    categories: { type: String, required: true },
    href:{ type: String, required: true },

  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);