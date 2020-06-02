var express = require('express');
var router = express.Router();
var config = require('./config.json');
var signatureVerification = require('./helpers/signatureCreation');
var enums = require('./helpers/enums');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newdb', { useNewUrlParser: true });
var session = require('express-session')
var _ = require("lodash")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
var receiptno = 0
var singleupload = multer({ storage: storage }).single('file')
var bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';
const GovSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phn: Number,
    reason: String,
    project: String,
    password: {
        type: String,
        required: true
    },
    logo: String
});
const Gov = mongoose.model('Gov', GovSchema);
const WorkSchema = new Schema({
    heading: String,
    content: String,
    name: String,
    email: String,
    postedBy: ObjectId
})
const Work = mongoose.model('Work', WorkSchema);
const UserSchema = new Schema({
    name: String,
    phno: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    confirmPassword: {
        type: String,
        /*  validate: function () {
              return this.password == this.confirmPassword;
          },*/
        //required: true,
    },
    regid: {
        type: String,
        unique: true,
        required: true
    },
    logo: String,

});

const User = mongoose.model('User', UserSchema);
const MemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    educQual: {
        type: String,
    },
    phNum: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        /*validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        } */
    },
    password: {
        type: String,
        required: true
    },
    cnfrmpassword: {
        type: String,
        // required:true
    },
})
const Member = mongoose.model('Member', MemberSchema);
const VolunteerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    educQual: {
        type: String,
    },
    phNum: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        /* validate(value){
             if(!validator.isEmail(value)){
                 throw new Error('Invalid Email')
             }
         } */
    },
    password: {
        type: String,
        required: true
    },
    cnfrmpassword: {
        type: String,
        //required:true
    },
})
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
/*require('./db/mongoose')
const Member= require('./models/member')
router.get('/members/signup',(req,res=>{
    res.render('member')
}))


router.post('/members/signup',async (req,res)=>{ 
    const member = new Member(req.body)
    
    try{ 
        await member.save()
        res.send(member)   
    }catch(e){
        res.status(400)
        res.send(e) 
    }
    
}) 

router.patch('/donateforcause/:id',async (req,res)=>{
    const _id= req.params.id
    try{
        await Member.findByIdAndUpdate({_id},{$inc:{ totalDonations: req.body.amount }}, {useFindAndModify: false}) 
        res.send()
    }catch(e){
        res.status(400).send(e) 
    } 

})
const Volunteer= require('./models/volunteer')



router.post('/volunteer/signup',async (req,res)=>{ 
    const volunteer = new Volunteer(req.body)

    try{ 
        if(req.body.password !== req.body.cnfrmpassword){
            return res.status(400).send('passwords donot match')
        }
        await volunteer.save()
        res.send(volunteer)   
    }catch(e){
        res.status(400)
        res.send(e)
    }
    
}) 

router.patch('/donateforcause/:id',async (req,res)=>{
    const _id= req.params.id
    try{
        await Volunteer.findByIdAndUpdate({_id},{$inc:{ totalDonations: req.body.amount }}, {useFindAndModify: false}) 
        res.send()
    }catch(e){
        res.status(400).send(e) 
    } 

})*/
router.get('/gov', function (req, res) {
    res.render('gov')
})
router.post('/gov', urlencodedParser, singleupload, function (req, res) {
    Gov.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {
            let newGov = new Gov();
            newGov.name = req.body.name;
            newGov.email = req.body.email;
            newGov.password = req.body.password;
            newGov.phn = req.body.phn;
            newGov.reason = req.body.reason;
            newGov.project = req.body.project;
            newGov.logo = req.file.filename;
            newGov.save(function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')

            });
        }
        else {
            res.render('gov', { message: "User already Exists" })
        }
    })
})

router.get('/registermember', (req, res) => {
    res.render('register2')
})
router.post('/registermember', urlencodedParser, function (req, res) {
    Member.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {
            let newMember = new Member();
            newMember.name = req.body.name;
            newMember.educQual = req.body.educQual;
            newMember.phNum = req.body.phNum;
            newMember.email = req.body.email;
            newMember.password = req.body.password;
            newMember.save(function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')

            });
        }
        else {
            res.render('register2', { message: "User already Exists" })
        }
    })
})
router.get('/registervolunteer', (req, res) => {
    res.render('register2')
})
router.post('/registervolunteer', urlencodedParser, function (req, res) {
    Volunteer.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {

            let newVolunteer = new Volunteer();
            newVolunteer.name = req.body.name;
            newVolunteer.educQual = req.body.educQual;
            newVolunteer.phNum = req.body.phNum;
            newVolunteer.email = req.body.email;
            newVolunteer.password = req.body.password;
            newVolunteer.save(function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')

            });
        }
        else {
            res.render('register2', { message: "User already Exists" })
        }
    })
})
router.get('/index', (req, res, next) => {
    console.log("index get hit");
    console.log(req.session.user.regid)
    res.render('checkout', {
        postUrl: config.paths[config.enviornment].cashfreePayUrl, user: req.session.task
    });
});

router.get('/register', (req, res) => {
    res.render('register1')
})
router.post('/register', urlencodedParser, singleupload, function (req, res) {
    User.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.regid = req.body.regid;
            newUser.phno = req.body.phno;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.logo = req.file.filename;
            newUser.save(function (err) {
                if (err) {
                    console.log(err, 'error')
                    return
                }
                res.redirect('/')

            });
        }
        else {
            res.render('register1', { message: "User already Exists" })
        }
    })
})
router.get('/form', (req, res) => {
    res.render('form')
})
var ses = ""
router.post('/form', urlencodedParser, (req, res) => {
    Member.findOne({ password: req.body.password, email: req.body.email, name: req.body.name }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {
            Volunteer.findOne({ password: req.body.password, email: req.body.email, name: req.body.name }, function (err, doc) {
                if (err) {
                    console.log(err, 'error')
                    res.redirect('/')
                    return
                }
                if (_.isEmpty(doc)) {
                    res.render('index', { message: "Please register first" })
                }
                else {
                    req.session.task = doc
                    ses = doc
                    res.redirect('/main/index')
                }
            })
        }
        else {
            req.session.task = doc
            ses = doc
            res.redirect('/main/index')
        }
    })

})

router.get('/ngo', (req, res) => {
    User.find({}, (err, docs) => {
        res.render('ngo', { ngo: docs })
    })
})
router.post('/ngo', urlencodedParser, function (req, res) {
    User.findOne({ regid: req.body.regid }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }

        req.session.user = doc
        var regid = req.session.user.regid
        res.redirect('/main/form')
    })
})


router.post('/result', (req, res, next) => {
    console.log("merchantHosted result hit");
    console.log(req.body);
    var postData = {
        orderId: req.body.orderId,
        orderAmount: req.body.orderAmount,
        referenceId: req.body.referenceId,
        txtStatus: req.body.txtStatus,
        paymentMode: req.body.paymentMode,
        txMsg: req.body.txMsg,
        txtime: req.body.txtime,
    }
    const txnTypes = enums.transactionStatusEnum;
    try {
        switch (req.body.txStatus) {
            case txnTypes.cancelled: {
                //buisness logic if payment was cancelled
                return res.status(200).render('result', {
                    data: {
                        status: "failed",
                        message: "transaction was cancelled by user",
                    }
                });
            }
            case txnTypes.failed: {
                //buisness logic if payment failed
                const signature = req.body.signature;
                const derivedSignature = signatureVerification.signatureResponse1(req.body, config.secretKey);
                if (derivedSignature !== signature) {
                    throw { name: "signature missmatch", message: "there was a missmatch in signatures genereated and received" }
                }
                return res.status(200).render('result', {
                    data: {
                        status: "failed",
                        message: "payment failure",
                    }
                });
            }
            case txnTypes.success: {
                //buisness logic if payments succeed
                const signature = req.body.signature;
                const derivedSignature = signatureVerification.signatureResponse1(req.body, config.secretKey);
                if (derivedSignature !== signature) {
                    throw { name: "signature missmatch", message: "there was a missmatch in signatures genereated and received" }
                }
                console.log("Success")
                receiptno = receiptno + 1
                return res.status(200).render('receipt', { data: postData, task: ses, receiptno: receiptno });


            }
        }
    }
    catch (err) {
        return res.status(500).render('result', {
            data: {
                status: "error",
                err: err,
                name: err.name,
                message: err.message,
            }
        });
    }

    const signature = req.body.signature;
    const derivedSignature = signatureVerification.signatureResponse1(req.body, config.secretKey);
    if (derivedSignature === signature) {
        console.log("works");
        return res.status(200).send({
            status: req.body.txStatus,
        })
    }
    else {
        console.log("signature gotten: ", signature);
        console.log("signature derived: ", derivedSignature);
        return res.status(200).send({
            status: "error",
            message: "signature mismatch",
        })
    }
});
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', urlencodedParser, (req, res) => {
    User.findOne({ password: req.body.password, email: req.body.email }, function (err, doc) {
        if (err) {
            console.log(err, 'error')
            res.redirect('/')
            return
        }
        if (_.isEmpty(doc)) {
            Gov.findOne({ password: req.body.password, email: req.body.email }, function (err, doc) {
                if (err) {
                    console.log(err, 'error')
                    res.redirect('/')
                    return
                }
                if (_.isEmpty(doc)) {
                    res.render('login', { message: "Please check email/password" })
                }
                else {
                    req.session.work = doc
                    res.redirect('/main/login/welcome')
                }
            })
        }
        else {
            req.session.work = doc
            res.redirect('/main/login/welcome')
        }
    })

})
const checkLogIn = (req, res, next) => {
    if (req.session.work) {
        next();
    } else {
        res.redirect('/404')
    }
}
router.get('/login/welcome', checkLogIn, (req, res, next) => {
    Work.find({ postedBy: req.session.work._id }, (err, docs) => {
        res.render('user', { user: req.session.work, blogs: docs })

    })
})

router.post('/login/welcome', urlencodedParser, checkLogIn, (req, res) => {
    let newWork = new Work()
    newWork.heading = req.body.heading
    newWork.content = req.body.content
    newWork.email = req.session.work.email
    newWork.name = req.session.work.name
    newWork.postedBy = req.session.work._id
    newWork.save(function (err) {
        if (err) {
            console.log(err, 'error')
            return
        }
        res.redirect('/main/login/welcome')

    });

})
router.get("/imageupload", checkLogIn, (req, res) => {
    res.render("upload")
})
router.post('/imageupload', singleupload, urlencodedParser, checkLogIn, (req, res) => {
    User.update({ email: req.session.work.email }, { logo: req.file.filename }, function (err, writeOpResult) {
        if (err) {
            console.log(err, 'error')
            return
        }
        res.redirect('/main/login/welcome')
    });
})
router.get('/logout', (req, res) => {
    req.session.destroy
    res.redirect('/')
})
module.exports = router;