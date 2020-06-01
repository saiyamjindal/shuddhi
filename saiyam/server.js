// const MONGO_DB ="mongodb+srv://creativeprotocol:shuddhi@cluster0-kdlho.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"; 
// const SK = process.env.SK;
var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/newdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    // console.log(db);
    console.log("ngodb connected");
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
   destination: "./public/uploads",
   filename: (req,file,cb)=>{
       cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
   }
});
var singleupload = multer({ storage: storage }).any();

// var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';

app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());


const NgoSchema = new Schema({
    name: String,
    regno : {
        type: Number,
        unique: true,
        required: true
    },
    // regcert:{
    //     type: String,
    //     default: "/default.png",
    //     // required: true
    // },
    // cert12a:{
    //     type: String,
    //     default: "/default.png",
    //     // required: true
    // },
    // cert80g:{
    //     type: String,
    //     default: "/default.png",
    //     // required: true
    // },
    // fcra:{
    //     type: String,
    //     default: "/default.png",
    //     // required: true
    // },
    acname:{
        type: String,
        required: true
    },
    acno: {
        type: Number,
        required: true
    },
    ifsccode:{
        type: String,
        required: true
    },
    bankadd:{
        type: String,
        required: true
    },
    authperson:{
        type: String,
        required: true
    },
    phno:{
        type: Number,
        required: true
    },
    email: {
        type: String,
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
        type: String
    }
});

const Ngo = mongoose.model('Ngo', NgoSchema);

app.get('/', function (req, res) {
    res.render('register')
})
app.post('/', singleupload , urlencodedParser, function (req, res) {
    let newNgo = new Ngo();
    newNgo.name = req.body.name;
    newNgo.regno = req.body.regno;
    // newNgo.regcert = req.files;
    // newNgo.cert12a =req.files;
    // newNgo.cert80g =req.files;
    // newNgo.fcra = req.files;
    newNgo.acname = req.body.acname;
    newNgo.acno = req.body.acno;
    newNgo.ifsccode = req.body.ifsccode;
    newNgo.bankadd = req.body.bankadd;
    newNgo.authperson = req.body.authperson;
    newNgo.phno = req.body.phno;
    newNgo.email = req.body.email;
    newNgo.password = req.body.password;
    newNgo.confirmPassword = req.body.confirmPassword;
    newNgo.description = req.body.description;
    // newNgo.description = req.body.description;
        console.log("Hello");
    newNgo.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }
        
    });
})


const port =3000;
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
  