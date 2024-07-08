require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.PRIVATE_KEY;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error("Authorization header not provided");
    }

   // const token = authorization.replace("Bearer ", "");

    const decodedToken = jwt.verify(authorization, jwtSecret);
    const userId = decodedToken.user.id;
    const currUser = await User.findById(userId);

    if (!currUser) {
      throw new Error(`User not found for ID: ${userId}`);
    }

    req.user = currUser;
    next();
  } catch (error) {
    return res.status(401).json( error.message+" please login (if not)" );
  }
};
