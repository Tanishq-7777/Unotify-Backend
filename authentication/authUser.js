const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (token == undefined) {
    return res.status(401).send("Your Token Is Expired.");
  }
  //verify the token
  const { userId } = jwt.verify(token, "2026$ASTROWORLD");
  const user = await User.findById(userId).select(
    "name email  isVerified isPremium",
  );
  if (!user) {
    return res.status(401).send("Your Token Is Invalid.");
  }
  req.user = user;
  next();
};
module.exports = {
  authUser,
};
