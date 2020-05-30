const mongoose =require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs') 

const memberSchema= new mongoose.Schema({
    name:{ 
        type:String,
        required:true,
    }, 
    educQual:{
        type:String,
    },
    phNum:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type: String,
        unique:true, 
        required: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        } 
    }, 
    password:{
        type:String,
        required:true
    }, 
    cnfrmpassword:{
        type:String,
        required:true
    },
    orgname:{
        type:String
    },
    cityName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    idNumber:{
        type:String,
        required:true
    },
    interests:{
        type:String,
        required:true
    },
    totalDonations:{
        type:Number,
        default:0
    }
})  


memberSchema.pre('save',async function(next){
    const member =this

    if(member.isModified('password')){
        member.password=await bcrypt.hash(member.password,8)  
    }  

    next()
}) 

const Members= mongoose.model('members',memberSchema)
module.exports= Members