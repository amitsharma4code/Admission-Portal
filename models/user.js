const mongoose= require('mongoose')


const UserSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:'user'
    },
    token:{
        type:String,
        default:''
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        },
    },
    
},{timestamps:true})

//create connecton

const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel;