const UserModel = require("../models/user");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CourseModel = require("../models/course");
const ContactModel = require("../models/contact");
cloudinary.config({
  cloud_name: "dxrvfbjzq",
  api_key: "985457195321677",
  api_secret: "StoHIkx0lN1IT76eYrjQ-wWBWA0",
  // secure: true
});
class FrontController {
  static addprotal = (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      message1: req.flash("error"),
    });
  };
  static register = async (req, res) => {
    res.render("register", { message: req.flash("error") });
  };
  static contact=async(req,res)=>{
    try {
         const{name,image}=req.user;
      res.render('contact',{n:name,img:image,message:req.flash("success"),message1:req.flash("error")})
    } catch (error) {
      console.log(error)
    }
  }
  
  static insertcontact=async(req,res)=>{
    try { 
         //  console.log(req.body)
         const{name,email,number,message}=req.body
         const result=new ContactModel({
             name:name,
             email:email,
             number:number,
             message:message
         })
         await result.save()
         req.flash('success',"Message Send Successfully,We canact as soon as possible")
         res.redirect('/contact')
        
       } catch (error) {
      console.log(error)
    }
  }
  static about=async(req,res)=>{
    try {
         const{name,image}=req.user;
      res.render('about',{n:name,img:image})
    } catch (error) {
      console.log(error)
    }
  }

  static studinsert = async (req, res) => {
    //  console.log(req.body)
    //  console.log(req.files)

    try {
      const { name, email, password, cpassword, role } = req.body;
      // console.log('body email',email)
      const imagefile = req.files.stud_img;
      // const admin = await AdminModel.findOne({ email: email });
      const user = await UserModel.findOne({ email: email });
      // console.log("email check",user);
      if (user) {
        req.flash("error", "email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword && imagefile) {
          if (password == cpassword) {
            const myimage = await cloudinary.uploader.upload(
              imagefile.tempFilePath,
              {
                folder: "studimage",
              }
            );
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              role: role,
              image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
              },
            });
            await result.save();
            req.flash("success", "Registrastion Successful! Please Login");
            res.redirect("/login");
          } else {
            req.flash("error", "Password and Conform password doesn't matched");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All Fields are required");
          res.redirect("/register");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  static login = async (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      message1: req.flash("error"),
    });
  };
  static verify_login = async (req, res) => {
    // console.log(req.body)
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user)
        if (user) {
          const ismatched = await bcrypt.compare(password, user.password);
          if (ismatched) {
            if (user.role == "user") {
              //token generated
              const token = jwt.sign({ id: user._id }, "amitdigital");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("/dashboard");
            }
            if (user.role == "admin") {
              //token generated
              const token = jwt.sign({ id: user._id }, "amitdigital");
              // console.log(token)
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
          } else {
            req.flash("error", "password is not matched");
            res.redirect("/addmisstion_protal");
          }
        } else {
          req.flash("error", "You are not registred user ! Please Register");
          res.redirect("/addmisstion_protal");
        }
      } else {
        req.flash("error", "All Fields Are Required");
        res.redirect("/addmisstion_protal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };
  static dashboard = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      // console.log(image);
      const btech = await CourseModel.findOne({
        user_id: _id,
        course: "B.Tech",
      });
      const bca = await CourseModel.findOne({
        user_id: _id,
        course: "BCA",
      });
      const mba = await CourseModel.findOne({
        user_id: _id,
        course: "MBA",
      });
      res.render("dashboard", { n: name, img: image, bt: btech,bca:bca,mba:mba });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
