const express =require('express')
const router= new express.Router()
const Ngo = require("../model/ngomodel")
var multer= require('multer')

var storage = multer.diskStorage({
   destination: "./public/uploads",
   filename: (req,file,cb)=>{
       cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
   }
});
var singleupload = multer({ storage: storage }).array(file,4);

// var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
    res.render('register')
})
router.post('/', singleupload , urlencodedParser, function (req, res) {
    let newNgo = new Ngo();
    newNgo.name = req.body.name;
    newNgo.regno = req.body.regno;
    newNgo.regcert = req.files;
    newNgo.cert12a =req.files;
    newNgo.cert80g =req.files;
    newNgo.fcra = req.files;
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

module.exports = router