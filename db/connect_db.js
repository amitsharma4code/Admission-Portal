const mongoose = require('mongoose')


const connectDB=()=>{
    return mongoose.connect('mongodb+srv://amitsh1405:ram@blog.ssq4cyw.mongodb.net/Addmission_Portal')

    .then(()=>{
        console.log('Connection succesfull')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB