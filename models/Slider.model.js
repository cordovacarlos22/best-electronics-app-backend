const mongoose = require("mongoose");

const SlidertSchema = new mongoose.Schema(
  {
    id: { type: Number, },
    img: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    bg:{type:String,require:true},
    category: { type: String, required: true }
  },
  { timestamps: true }
);



const Slider = mongoose.model('slider', SlidertSchema);

module.exports = Slider;
