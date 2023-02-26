const mongoose = require("mongoose");

const NewsLetterSchema = new mongoose.Schema(
  {
    id: { type: Number, },
    email: { type: String, required: true },
  },
  { timestamps: true }
);



const newsletter = mongoose.model('newsletter', NewsLetterSchema);

module.exports = newsletter ;
