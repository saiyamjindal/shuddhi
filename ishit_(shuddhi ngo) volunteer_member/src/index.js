const express= require('express')
require('./db/mongoose')
const memberRouter=require('./routers/member')
const volunteerRouter= require('./routers/volunteer')

const app= express() 
const port = process.env.PORT || 3000


app.use(express.json())
app.use(memberRouter) 
app.use(volunteerRouter) 



app.listen(port,()=>{
    console.log('Server is up on port '+port)
})