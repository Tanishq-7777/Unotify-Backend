const mongoose = require("mongoose");
const User = require("./user");
const captionsScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: "String",
  },
  text: {
    type: "String",
  },
  aiResponse: {
    type: "String",
  },
});

module.exports = mongoose.model("Captions", captionsScheema);
