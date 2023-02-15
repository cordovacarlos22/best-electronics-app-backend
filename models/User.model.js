const mongoose = require ("mongoose");
const crypto = require("crypto");

//! parametros para configurar encrypt
const encryptConfig = {
  "algorythm": "sha512",
  "iterarions": 1000,
  "length": 512
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {type:String, required:true},
    lastName: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },   
    isAdmin:{type:Boolean, default:false},
    
  },
  { timestamps: true },
);


UserSchema.methods.hashPassword = function (password) { // No funcionaba porque estabamos usando funcion flecha y la instrucción
  this.salt = crypto.randomBytes(10).toString("hex");
  var encrypted = crypto
    .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
    .toString("hex");
  this.password = encrypted;
}

UserSchema.methods.validatePassword = function (password) {

  var hashedPwd = crypto
    .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
    .toString("hex");
  return this.password === hashedPwd;
}

const User = mongoose.model('user', UserSchema);

module.exports = User;