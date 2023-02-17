const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;
//! generates token 
const generateToken = (payload) => {
  return jwt.sign(payload, secret);
}

//! reads token 
const readToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(error.message);
    throw new Error("Invalid token provided");
  }
}
//! valitdates accces to admin 
const validateAccess = (req, res, next) => {
  try {
    var { authorization } = req.headers;
    if (authorization) {
      // var [type, token] = authorization.split(" ");
      let [type, admin] = authorization.split(" ");
      if (!admin) {
        throw new Error("Sorry Your are not admin")
      }
      const payload = readToken(admin);
      req.user = payload;
      next();
    } else throw new Error("Token is requiered to achieve this service.");
  } catch (error) {
    res.status(403);
    res.end(error.message);
  }

}

module.exports = { generateToken, readToken, validateAccess };