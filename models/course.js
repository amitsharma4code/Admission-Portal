const mongoose= require('mongoose')


const CourseSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
    email:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    college:{
        type:String,
        require:true
    },
    course:{
        type:String,
        require:true
    },
    branch:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    }
    
},{timestamps:true})

//create connecton

const CourseModel=mongoose.model('Course',CourseSchema)

module.exports=CourseModel;