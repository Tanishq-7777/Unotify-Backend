const mongoose = require("mongoose");

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
  },
  { timestamps: true },
);
const User = mongoose.model("User", userScheema);
module.exports = User;
