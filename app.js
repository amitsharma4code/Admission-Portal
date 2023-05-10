
const admin_auth=require('./middleware/auth')
const BlogController=require('./controller/BlogController')
const FrontController=require('./controller/FrontController')
const connectDB=require('./db/connect_db')
const express = require('express')
const bodyParser=require('body-parser')
const router=express.Router()
var cloudinary = require('cloudinary');
var flash = require('connect-flash');
var session=require('express-session')
const fileUpload=require('express-fileupload');
const dotenv=require('dotenv')
dotenv.config({path:'.env'})
const app = express()
const port = 3000;

//set ejs 
app.set('view engine','ejs')

// default public file
app.use(express.static('public'));

//image upload
app.use(fileUpload({useTempFiles:true}));


//Database Connection
connectDB()

// body parser
app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.urlencoded({extended:false}))

//for send message
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));
app.use(flash());

//get token
const cookieParser = require('cookie-parser')
const AdminController=require('./controller/AdminController')
const PswController = require('./controller/PswController')
app.use(cookieParser())

//routes

//FrontController Routes
app.get('/',FrontController.addprotal)
app.get('/register',FrontController.register)
app.post('/studinsert',FrontController.studinsert)
app.get('/contact',admin_auth,FrontController.contact)
app.post('/insertcontact',admin_auth,FrontController.insertcontact)
app.get('/about',admin_auth,FrontController.about)
app.get('/dashboard',admin_auth,FrontController.dashboard)
app.post('/verify_login',FrontController.verify_login)
app.get('/login',FrontController.login)
app.get('/logout',FrontController.logout)


//BTECH FORM ROUTES

app.get('/btechformcreate',admin_auth,BlogController.btechformcreate)
app.post('/btechforminsert',admin_auth,BlogController.btechforminsert)
app.get('/btechformdisplay',admin_auth,BlogController.btechformdisplay)
app.get('/btechformview',admin_auth,BlogController.btechformview)
app.get('/btechformedit',admin_auth,BlogController.btechformedit)
app.post('/btechformupdate/:id',admin_auth,BlogController.btechformupdate)

// BCA FORM Routes
app.get('/bca',admin_auth,BlogController.bcaformcreate)
app.post('/bcaforminsert',admin_auth,BlogController.bcaforminsert)
app.get('/bcaformdisplay',admin_auth,BlogController.bcaformdisplay)
app.get('/bcaformview',admin_auth,BlogController.bcaformview)
app.get('/bcaformedit',admin_auth,BlogController.bcaformedit)
app.post('/bcaformupdate/:id',admin_auth,BlogController.bcaformupdate)

//MBA FORM Routes
app.get('/mbaformcreate',admin_auth,BlogController.mbaformcreate)
app.post('/mbaforminsert',admin_auth,BlogController.mbaforminsert)
app.get('/mbaformdisplay',admin_auth,BlogController.mbaformdisplay)
app.get('/mbaformview',admin_auth,BlogController.mbaformview)
app.get('/mbaformedit',admin_auth,BlogController.mbaformedit)
app.post('/mbaformupdate/:id',admin_auth,BlogController.mbaformupdate)






//AdminController

app.get('/admin/dashboard',admin_auth,AdminController.dashboard)
app.get('/admin/displaydata',admin_auth,AdminController.displaydata)
app.get('/admin/displaycontact',admin_auth,AdminController.displaycontact)
app.get('/admin/updatepassword',admin_auth,AdminController.updatepasswordcreate)
app.post('/admin/editpassword',admin_auth,AdminController.editpassword)
app.get('/admin/updatephoto',admin_auth,AdminController.updatephotocreate)
app.post('/admin/editphoto',admin_auth,AdminController.editphoto)
app.get('/admin/app/approve/:id',admin_auth,AdminController.applicationApprove)
app.get('/admin/app/reject/:id',admin_auth,AdminController.applicationReject)





//PasswordController

app.get('/forgot/create',PswController.create);
app.post('/verify_psw',PswController.verify_psw);
app.get('/forget-psw',PswController.reset_psw_create)
app.post('/psw_update',PswController.psw_update)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})
