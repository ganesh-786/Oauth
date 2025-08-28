import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).send("No valid token");
    }

    try {
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The user is ", req.user);
      next();
    } catch (error) {
      console.log("some error while verifying");
    }
  } else {
    return res.status(400).send("No token provided");
  }
};
