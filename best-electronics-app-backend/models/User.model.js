const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {type:String, required:true, unique:true},
    lastName: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: String, // CAMPO PARA HACER EL HASH DEL PASSWORD
    // createdAt: { type: String, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user',UserSchema);