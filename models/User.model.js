const mongoose = require("mongoose");
const crypto = require("crypto");


//! sets value for encryption config
const encryptConfig = {
  "algorythm": "sha512",
  "iterarions": 1000,
  "length": 512
}
 
 
//! user Schema 
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false},
  lastName: { type: String, required: true, unique: false},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false},
  isAdmin: { type: Boolean, default: false },
  salt: String, // este campo es necesario, es la llave para leer la contraseña encryptada
  // createdAt: { type: String, default: Date.now }
}, { timestamps: true }
);

//! hashes password
UserSchema.methods.hashPassword = function (password) { // No funcionaba porque estabamos usando funcion flecha y la instrucción
  this.salt = crypto.randomBytes(10).toString("hex");
  var encrypted = crypto
    .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
    .toString("hex");
  this.password = encrypted;
}
//! decry password after it has been hashed
UserSchema.methods.validatePassword = function (password) {
  //* hashed -> decypted -> check if =  (password)
  //*  password ==   -> hashes -> check if ==  (hashed en modelo)

  var hashedPwd = crypto
    .pbkdf2Sync(password, this.salt, encryptConfig.iterarions, encryptConfig.length, encryptConfig.algorythm)
    .toString("hex");
  return this.password === hashedPwd;
}

//! exports userSchema as User
const User = mongoose.model("User", UserSchema);

module.exports = User;
