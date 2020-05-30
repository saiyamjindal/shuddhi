const express =require('express')
const router= new express.Router()
const Volunteer= require('../models/volunteer')



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

})

module.exports=router

