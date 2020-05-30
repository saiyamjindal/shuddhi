const express =require('express')
const router= new express.Router()
const Member= require('../models/member')



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

module.exports=router
