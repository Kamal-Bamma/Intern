const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// const generateAuthToken = async (user) => {
//   const token = jwt.sign(
//     { _id: user._id, email: user.email },
//     process.env.jwt_secret,
//     {
//       expiresIn: "7d", // Token expiration time (optional)
//     }
//   );

//   user.tokens = user.tokens.concat({ token });
//   await User.save();

//   return token;
// };

const authenticateToken = (req, res, next) => {
  // Example of token-based authentication middleware
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded; // Attach user data to req
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const authenticate = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.redirect("/login"); // Redirect to login if not authenticated
  }
};

module.exports = { authenticateToken, authenticate };
