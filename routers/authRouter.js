const express = require("express");
const validate = require("../validation/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const User = require("../models/user");
const { authUser } = require("../authentication/authUser");
const { sendVerificationEmail } = require("../authentication/email");
authRouter.post("/signup", async (req, res) => {
  try {
    validate(req);
    const { name, email, password } = req.body;
    const hashedPassoword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const user = new User({
      name,
      email,
      password: hashedPassoword,
      verificationCode,
    });
    sendVerificationEmail(email, verificationCode);
    await user.save();

    const token = jwt.sign({ userId: user._id }, "2026$ASTROWORLD", {
      expiresIn: "30d",
    });

    res.cookie("token", token);
    res.json({ data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
authRouter.post("/verifyEmail", async (req, res) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({ verificationCode: verificationCode });
    if (!user) {
      return res.status(400).send("Verification Code is Expired or not valid.");
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    res.send("User Has been Verified.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "name email password isVerified",
    );
    if (!user) {
      throw new Error("No User Found.");
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign({ userId: user._id }, "2026$ASTROWORLD", {
        expiresIn: "30d",
      });
      res.cookie("token", token);
      res.json({ data: user });
    } else {
      res.send("Something went wrong");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.get("/profile", authUser, (req, res) => {
  res.json({ data: req.user });
});

module.exports = {
  authRouter,
};
