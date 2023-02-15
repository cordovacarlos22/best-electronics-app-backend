const mongoose = require("mongoose");

const SlidertSchema = new mongoose.Schema(
  {
    id: { type: Number,},
    title: { type: String, required: true},
    alt: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);



const Slider = mongoose.model('slider', SlidertSchema);

module.exports = Slider;
