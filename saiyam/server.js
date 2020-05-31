const MONGO_DB ="mongodb+srv://creativeprotocol:creativeprotocol@cluster0-kdlho.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"; 
// const SK = process.env.SK;
var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')
const mongoose = require('mongoose');
mongoose
  .connect("mongodb+srv://creativeprotocol:creativeprotocol@cluster0-kdlho.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    // console.log(db);
    console.log("userDB connected");
  })
  .catch(function (err) {
    console.log(err);
});
var session = require('express-session')
var _ = require("lodash")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const crypto = require('crypto');
const url = require('url');

var bodyParser = require("body-parser")
var multer= require('multer')

var storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: (req,file,cb)=>{
       cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
   }
});
var singleupload = multer({ storage: storage }).single('file')

// var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';

app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());


const UserSchema = new Schema({
    name: String,
    regno : {
        type: Number,
        unique: true,
        required: true
    },
    regcert:{
        type: String,
        default: "/default.png",
        // required: true
    },
    cert12a:{
        type: String,
        default: "/default.png",
        // required: true
    },
    cert80g:{
        type: String,
        default: "/default.png",
        // required: true
    },
    fcra:{
        type: String,
        default: "/default.png",
        // required: true
    },
    acname:{
        type: String,
        unique: true,
        required: true
    },
    acno: {
        type: Number,
        unique: true,
        required: true
    },
    ifsccode:{
        type: String,
        unique: true,
        required: true
    },
    bankadd:{
        type: String,
        unique: true,
        required: true
    },
    authperson:{
        type: String,
        unique: true,
        required: true
    },
    phno:{
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true,
        select: false,
      },
      confirmPassword: {
        type: String,
        validate: function () {
          return this.password == this.confirmPassword;
        },
        required: true,
      },
      description:{
        type: String,
        unique: true,
        required:true
    }
});

const User = mongoose.model('User', UserSchema);

app.get('/', function (req, res) {
    res.render('register')
})
app.post('/', singleupload,urlencodedParser, function (req, res) {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.regno = req.body.regno;
    // newUser.regcert = req.file.filename;
    // newUser.cert12a =req.file.filename;
    // newUser.cert80g =req.file.filename;
    // newUser.fcra = req.file.filename;
    newUser.acname = req.body.acname;
    newUser.acno = req.body.acno;
    newUser.ifsccode = req.body.ifsccode;
    newUser.bankadd = req.body.bankadd;
    newUser.authperson = req.body.authperson;
    newUser.phno = req.body.phno;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.confirmPassword = req.body.confirmPassword;
    // newUser.description = req.body.description;

    newUser.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }

    });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server has started at port 3000");
  });



//   module.exports.updateProfileImage = async function updateProfileImage(req, res) {
//     // update anything
//     //  form data 
//     try {
//       // console.log(req.file);
//       let serverPath = `public/img/users/user-${Date.now()}.jpeg`
//       // process
//       console.log("I was here");
//       await sharp(req.file.path)
//         .resize(200, 200)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(serverPath);
//       serverPath = serverPath.split("/").slice(1).join("/");
      
//       let user = await userModel.findById(req.id);
      
//       user.profileImage = serverPath;
  
//       await user.save({ validateBeforeSave: false });
//       // console.log("I was here");
//       res.status(200).json({
//         status: "image uploaded"
//       })
//     } catch (err) {
//       console.log(err);
//       console.log(err.message);
//     }
//   }
  