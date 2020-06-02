// const MONGO_DB ="mongodb+srv://creativeprotocol:shuddhi@cluster0-kdlho.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"; 
// const SK = process.env.SK;
var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')
<<<<<<< HEAD
const sharp = require("sharp");
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
=======

>>>>>>> 0af23c39558d5db11c3335bcd33dab47f7d4569e
var session = require('express-session')
var _ = require("lodash")

<<<<<<< HEAD
var bodyParser = require("body-parser")
var multer= require('multer')
// var singleupload = multer({ storage: storage });

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
}

const multerStorage = multer.diskStorage({  
        destination: function (req, file, cb) {
          cb(null, "public/raw")
        },
        filename: function (req, file, cb) {
      
          cb(null, `user-${Date.now()}.jpeg`)
        }
      })

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
  })
  let multiImageHandler = upload.fields([{
    name: "regcert", maxCount: 1
  }, {
    name: "cert12a", maxCount: 1    
  }]);

  async function uploadFile(req, res,next) {
    try {
      // 
      console.log(req.files);
      await sharp(req.files.regcert[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      }).toFile(`public/final/regcert.jpeg`)
      // cover
      // start
      await sharp(req.files.cert12a[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      }).toFile(`public/final/cert12a.jpeg`)
  
      console.log("will reach after processing every image");
      res.status(200).json({
        status: "data uploaded successfully"
      })
      next();
    } catch (err) {
      console.log(err.message);
    }
  }




var urlencodedParser = bodyParser.urlencoded({ extended: false })
=======

var bodyParser = require("body-parser")

>>>>>>> 0af23c39558d5db11c3335bcd33dab47f7d4569e
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';

app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());

<<<<<<< HEAD

const NgoSchema = new Schema({
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
    res.render('trial')
})
app.post('/', multiImageHandler, uploadFile, urlencodedParser, function (req, res) {
    let newNgo = new Ngo();
    newNgo.name = req.body.name;
    newNgo.regno = req.body.regno;
    newNgo.regcert = req.files.regcert[0].path;
    newNgo.cert12a =req.files.cert12a[0].path;
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
        console.log("req.files");
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
  })
=======
const port =3000;
app.listen(port, function () {
    console.log("Server has started at port 3000");
  });
>>>>>>> 0af23c39558d5db11c3335bcd33dab47f7d4569e
