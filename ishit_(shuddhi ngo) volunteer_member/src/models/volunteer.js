const mongoose =require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')

const volunteerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }, 
    educQual:{
        type:String,
    },
    phNum:{
        type:Number,
        required:true
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
    cityName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    idNumber:{
        type:String,
        required:true,
        unique:true
    },
    interests:{
        type:String,
        required:true
    },
    totalDonations:{
        type:Number,
    }
})  


volunteerSchema.pre('save',async function(next){
    const volunteer =this

    if(volunteer.isModified('password')){
        volunteer.password=await bcrypt.hash(volunteer.password,8)  
    }  
    next()
}) 





const Volunteers=mongoose.model('volunteers',volunteerSchema)
module.exports=Volunteers
