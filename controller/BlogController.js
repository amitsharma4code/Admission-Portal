const UserModel = require("../models/user");
const CourseModel = require("../models/course");

class BlogController {
  // BTECH Form Controller Method

  static btechformcreate = async (req, res) => {
    try {
      // console.log(req.user)
      const { name, image, email } = req.user;
      res.render("courses/btech/btechformcreate", {
        n: name,
        img: image,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static btechforminsert = async (req, res) => {
    try {
      // console.log(req.body)
      const { _id } = req.user;
      // console.log("id",_id)
      const {
        name,
        email,
        number,
        dob,
        gender,
        address,
        college,
        course,
        branch,
      } = req.body;
      const result = new CourseModel({
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: _id,
      });
      await result.save();
      //  console.log(result)
      res.redirect("/btechformdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static btechformdisplay = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
     
      // console.log(_id)
      const coursedata = await CourseModel.findOne({ user_id:_id,course:"B.Tech"});
      //  console.log("course data",coursedata);
      res.render("courses/btech/btechformdisplay", {n: name,img: image,cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static btechformview = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id:_id,course:"B.Tech"});
      //  console.log("course data",coursedata);
      res.render("courses/btech/btechformview", {
        n: name,
        img: image,
        cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static btechformedit = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id: _id,course:"B.Tech" });
      //  console.log("course data",coursedata);
      res.render("courses/btech/btechformedit", {n: name,img: image,cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static btechformupdate = async (req, res) => {
    try {
      const {
        name,
        email,
        number,
        dob,
        gender,
        address,
        college,
        course,
        branch,
        user_id,
      } = req.body;
      const result = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: user_id,
      });
      await result.save();
      res.redirect("/btechformdisplay");
    } catch (error) {
      console.log(error);
    }
  };


  // BCA-FORM- Controller Mehod

  static bcaformcreate = async (req, res) => {
    try {
      const { name, email, image, _id } = req.user;
      res.render("courses/bca/bcaformcreate", {
        n: name,
        img: image,
        email: email,
        id: _id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static bcaforminsert = async (req, res) => {
    try {
      const {_id} = req.user;
      //  console.log(req.body);
      const {
        name,
        email,
        number,
        dob,
        gender,
        address,
        college,
        course,
        branch,
      } = req.body;

      const result = new CourseModel({
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: _id,
      });
      await result.save();
      res.redirect("/bcaformdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static bcaformdisplay = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const cdata = await CourseModel.findOne({ user_id: _id, course: "BCA" });
      // console.log("BCA Course Data",cdata)
      res.render("courses/bca/bcaformdisplay", {
        n: name,
        img: image,
        cdata: cdata,
      });
    } catch (error) {}
  };
  static bcaformview = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id:_id,course:"BCA"});
      //  console.log("course data",coursedata);
      res.render("courses/bca/bcaformview", {
        n: name,
        img: image,
        cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static bcaformedit = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id: _id,course:"BCA" });
      //  console.log("course data",coursedata);
      res.render("courses/bca/bcaformedit", {n: name,img: image,cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static bcaformupdate = async (req, res) => {
    // console.log(req.params.id)
    try {
      const {
        name,
        email,
        number,
        dob,
        gender,
        address,
        college,
        course,
        branch,
        user_id,
      } = req.body;
      const result = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: user_id,
      });
      await result.save();
      res.redirect("/bcaformdisplay");
    } catch (error) {
      console.log(error);
    }
  };
  
  // MBA Controller Mehod

  static mbaformcreate = async (req, res) => {
    try {
         const { name, image,email } = req.user;
         res.render("courses/mba/mbaformcreate", { n: name, img: image,email });
    } catch (error) {
      console.log(error)
    }
    
  };

  static mbaforminsert = async (req, res) => {
    try {
        //  console.log("body",req.body)
          const {_id}= req.user;
        //  console.log("userid",_id);
           const {
                 name,
                 email,
                 number,
                 dob,
                 gender,
                 address,
                 college,
                 course,
                 branch,
             } = req.body;
      //  console.log(name)
      const result = new CourseModel({
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id:_id
      });
      await result.save();
      res.redirect("/mbaformdisplay");
    } catch (error) {
      console.log(error);
    }
  };
  
  static mbaformdisplay = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const cdata = await CourseModel.findOne({ user_id: _id, course: "MBA" });
      // console.log("BCA Course Data",cdata)
      res.render("courses/mba/mbaformdisplay", {
        n: name,
        img: image,
        cdata: cdata,
      });
    } catch (error) {}
  };

  static mbaformview = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id:_id,course:"MBA"});
      //  console.log("course data",coursedata);
      res.render("courses/mba/mbaformview", {
        n: name,
        img: image,
        cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static mbaformedit = async (req, res) => {
    try {
      const { name, image, _id } = req.user;
      const coursedata = await CourseModel.findOne({ user_id: _id,course:"MBA" });
      //  console.log("course data",coursedata);
      res.render("courses/mba/mbaformedit", {n: name,img: image,cdata: coursedata,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static mbaformupdate = async (req, res) => {
    // console.log(req.params.id)
    try {
      const {
        name,
        email,
        number,
        dob,
        gender,
        address,
        college,
        course,
        branch,
        user_id,
      } = req.body;
      const result = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        number: number,
        dob: dob,
        gender: gender,
        address: address,
        college: college,
        course: course,
        branch: branch,
        user_id: user_id,
      });
      await result.save();
      res.redirect("/mbaformdisplay");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = BlogController;
