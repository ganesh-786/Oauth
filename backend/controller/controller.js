import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedpassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `new user:${username} created successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({ message: "no user!" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).json({ message: "password not matched!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Some error during login" });
    console.log(error);
  }
};

export const adminUser = (req, res) => {
  res.status(200).send("Welcome Admin!");
};

export const managerUser = (req, res) => {
  res.status(200).send("Welcome Manager!");
};

export const userUser = (req, res) => {
  res.status(200).send("Welcome User!");
};
