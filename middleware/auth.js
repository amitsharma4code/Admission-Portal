const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const admin_auth = async (req, res, next) => {
  try {
    // console.log("hello admin");
    const { token } = req.cookies;
    // console.log(token);
    const verify_token = jwt.verify(token, "amitdigital");
    //  console.log(verify_token);
    const user_data = await UserModel.findOne({ _id: verify_token.id });
    // console.log("user_data", user_data);
    req.user= user_data;
    next();
  } catch (error) {
    res.redirect("/login");
  }
};
module.exports = admin_auth;
