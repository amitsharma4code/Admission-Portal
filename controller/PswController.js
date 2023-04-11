const UserModel = require("../models/user");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class PswController {
  static create = async (req, res) => {
    try {
      res.render("password/pswload", {
        message: req.flash("success"),
        message1: req.flash("error")
      });
    } catch (error) {
      console.log(error);
    }
  };
  static verify_psw = async (req, res) => {
    try {
      const { email } = req.body;
      //  console.log(email)
      const user = await UserModel.findOne({ email: email });
      // console.log(data);
      if (user) {
        const randomString = randomstring.generate();
        //  console.log(randomString)
        const updatedData = await UserModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        // console.log(updatedData);
        const token = await UserModel.findOne({ email: email });
        // console.log("token",token.token)
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "amitsh.1405@gmail.com",
            pass: "scsjynzbteaxfwlh",
          },
        });

        var mailOptions = {
          from: "amitsh.1405@gmail.com",
          to: "amitsharma4code@gmail.com",
          subject: "Node js mail send",
          html:
            "<p>hii " +
            user.name +
            ',plaese click here to <a href="http://localhost:3000/forget-psw?token=' +
            token.token +
            '">reset </a> your password</p>',
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            // console.log("Email sent: " + info.response);
            req.flash("error", "Email Send Successfully,Please check Email");
           res.redirect("/forgot/create");
          }
        });
      } else {
        req.flash("error","Please Enter Valid Gmail");
        res.redirect("/forgot/create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static reset_psw_create = async (req, res) => {
    try {
      const token = req.query.token;
      //  console.log("token",token);
      const verifytoken = await UserModel.findOne({ token: token });
      // console.log(verifytoken)
      if (verifytoken) {
        res.render("password/resetpsw", {
          user_id: verifytoken._id,
          n: verifytoken.name,
          img: verifytoken.image,
        });
      } else {
        res.render("password/404");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static psw_update = async (req, res) => {
    try {
      const { psw, user_id } = req.body;
      // console.log(psw,user_id)
      const hashpassword = await bcrypt.hash(psw, 10);
      console.log(hashpassword);
      const data = await UserModel.findById({ _id: user_id });
      // console.log(data)
      if (data) {
        const updatepsw = await UserModel.findByIdAndUpdate(
          { _id: user_id },
          { $set: { password: hashpassword, token: "" } }
        );
        req.flash("success", "Passward Updated Successfully, Please Login");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = PswController;
