const jwt = require("jsonwebtoken");

//! valitdates accces to admin 
const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers.token;
  try {
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1]
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) res.status(403).json("Token is not valid or has expired!");
        req.user = user;
        next();
      })
    } else throw new res.status(401).json(("Token is require to achieve this service!"));
  } catch (error) {
    res.status(403).json(error);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  validateToken(req, res, () => {
    if (res.user.id === req.params.id || req.user.isAdmin) {
       next();
    }else{
      res.status(403).json("You are not allowed to perform this action! ")
    }
  });
};

module.exports = { validateToken, verifyTokenAndAuthorization };

