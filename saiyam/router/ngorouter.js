const express = require('express');
var app = express();
const router= new express.Router()
const Ngomodel= require('../model/ngomodel');
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')
var session = require('express-session')

var sharp = require('sharp');

var bodyParser = require("body-parser")
var multer= require('multer')

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
  },
  {
    name: "cert80g", maxCount: 1
  },
  {
    name: "fcra", maxCount: 1
  }
]);

  async function uploadFile(req, res, next) {
    try {
      // 
        await sharp(req.files.regcert[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      })
      // cover
      // start
      await sharp(req.files.cert12a[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      })

      await sharp(req.files.cert80g[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      })

      await sharp(req.files.fcra[0].path).resize(2000, 1500).toFormat("jpeg").jpeg({
        quality: 90
      })
  
      console.log("will reach after processing every image");
      res.status(200).json({
        status: "data uploaded successfully"
      })
      next();
    } catch (err) {
      console.log(err.message);
    }
  }
// Query Helper


class QueryHelper {
  constructor(initialfindp, queryObj) {
    this.query = initialfindp;
    this.queryObj = queryObj;//q
  }
  filter() {
    let myQuery = { ...this.queryObj };
    let toExcludeFields = ["sort", "select", "limit", "page"]
    for (let i = 0; i < toExcludeFields.length; i++) {
      delete myQuery[toExcludeFields[i]];
    }
    this.query = this.query.find(myQuery);
    // myquery => input 
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      let sortString = this.queryObj.sort.split("%").join(" ");
      this.query = this.query.sort(sortString);
    }
    return this;
  }
  select() {
    if (this.queryObj.select) {
      let selectString = this.queryObj.select.split("%").join(" ");
      this.query = this.query.select(selectString);
    }
    return this;
  }
  paginate() {
    let page = Number(this.queryObj.page) || 1;
    let limit = Number(this.queryObj.limit) || 4;
    const toSkip = limit * (page - 1);
    // [10,]
    this.query = this.query.skip(toSkip).limit(limit);
    return this;
  }
}



  var urlencodedParser = bodyParser.urlencoded({ extended: false })

  var bodyParser = require("body-parser")
  
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
  const secret = 'abcdefg';
  
  app.use(express.static(__dirname + '/public'));
   app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.render('trial')
})
app.post('/', multiImageHandler, uploadFile,urlencodedParser, function (req, res) {
    let newNgo = new Ngomodel();
    newNgo.name = req.body.name;
    newNgo.regno = req.body.regno;
    newNgo.regcert = req.files.regcert[0].path;
    newNgo.cert12a =req.files.cert12a[0].path;
    newNgo.cert80g =req.files.cert80g[0].path;
    newNgo.fcra = req.files.fcra[0].path;
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
    console.log("Hello guys");
    console.log(req.files);
    newNgo.save(function (err) {
        if (err) {
            console.log(err.message);
            return
        }
        
    });
})
app.get("/getallngo", async function(req,res){
  const ngolist = await Ngomodel.find('ngo',{ngo:docs})
  res.status(200).json({
        status: "all ngos recieved",
        data: ngolist,
      });

  // try {
  //   // 
  //   let willGetAllElementsPromise = new QueryHelper(Ngomodel.find(), req.query);
  //   // pageElements = filteredElements.slice(toSkip, toSkip + limit);
  //   let filteredElements = willGetAllElementsPromise.filter().sort().select().paginate();
  //   let finalans = await filteredElements.query;
  //   res.status(200).json({
  //     status: "all Elements recieved",
  //     data: finalans,
  //   });
  // } catch (err) {
  //   console.log(err.message);
  // }
})
module.exports = app;