const ContactModel = require("../models/contact");
const CourseModel = require("../models/course");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const { findById } = require("../models/contact");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dxrvfbjzq",
  api_key: "985457195321677",
  api_secret: "StoHIkx0lN1IT76eYrjQ-wWBWA0",
  // secure: true
});

class AdminController{

  static dashboard=async(req,res)=>{

    const {_id}=req.user;
    const admindata=await UserModel.findOne({_id:_id})
    // console.log(admindata)
    res.render('admin/dashboard',{n:admindata.name,img:admindata.image});
  }
  static displaydata=async(req,res)=>{
    const {name,image}=req.user;
    const data=await CourseModel.find()
    res.render('admin/displaydata',{n:name,img:image,data:data,message:req.flash("success"),message1:req.flash("error")});
  }
  static displaycontact=async(req,res)=>{
    try {
            const {name,image}=req.user;
            const cdata=await ContactModel.find()
            res.render('admin/display_contact',{n:name,img:image,cdata:cdata});
    } catch (error) {
      console.log(error)
    }
    
  }


  static updatepasswordcreate=async(req,res)=>{
    try {
          const{name,image}=req.user;
          res.render('admin/createpassword',{n:name,img:image,message:req.flash("success"),message1:req.flash("error")});
    } catch (error) {
      console.log(error)
    }
  }

  static editpassword=async(req,res)=>{
    try {
          // console.log(req.body)
          const {password,npassword,cnpassword}=req.body;
           if(npassword == cnpassword){
              //  console.log("all field are matched")
                const{_id}=req.user;
                const user=await UserModel.findById(_id)
                // console.log(user);
                 const ismatched = await bcrypt.compare(password, user.password);
                //  console.log(ismatched)
                if(ismatched){
                  const hashpassword = await bcrypt.hash(npassword, 10);
                  // console.log("hashpassword",hashpassword)
                   const update=await UserModel.updateOne({_id:_id},{$set:{password:hashpassword}})
                  //  console.log(update);
                  req.flash("success","Password Updated Successfully")
                  res.redirect('/admin/updatepassword');
                }else{
                  req.flash("error","You are not etering right password! please remember your password and try again")
                  res.redirect('/admin/updatepassword');

                }
                
          }else{
            req.flash("error","Password And Conform Password Doesn't Matched")
            res.redirect('/admin/updatepassword');
          }
    } catch (error) {
      console.log(error)
    }
  }
  static updatephotocreate=async(req,res)=>{
    try {
          const{name,image}=req.user;
          res.render('admin/createphoto',{n:name,img:image,message:req.flash("success"),message1:req.flash("error")});
    } catch (error) {
      console.log(error)
    }
  }
  static editphoto=async(req,res)=>{
    // console.log(req.files)
    const {_id}=req.user
    const user=await UserModel.findById(_id);
    //console.log(user)
    const imageid=user.image.public_id;
    //console.log(imageid);
    await cloudinary.uploader.destroy(imageid)
    const file=req.files.image
    // console.log("file",file)
    const  myimage=await cloudinary.uploader.upload(file.tempFilePath,{
      folder: "studimage",
    })
    const update= await UserModel.updateOne({_id:_id},{$set:{image:myimage}})
    // console.log(update);
    req.flash("success","Photo Updated Successfully");
    res.redirect('/admin/updatephoto');
  }
 static applicationApprove=async(req,res)=>{
   const data= await CourseModel.findByIdAndUpdate(req.params.id,{
    status:"Approved",
    comment:"Please visit your selected college with document"
   })
   await data.save();
  //  console.log(data);
   req.flash("success","Status Approved");
   res.redirect('/admin/displaydata');
 }
 static applicationReject=async(req,res)=>{
  const data= await CourseModel.findByIdAndUpdate(req.params.id,{
   status:"Reject",
   comment:"Your are rejected by Admin"
  })
  await data.save();
 //  console.log(data);
  req.flash("error","Rejected Done");
  res.redirect('/admin/displaydata');
}
}
module.exports=AdminController;
