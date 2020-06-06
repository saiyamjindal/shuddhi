// const MONGO_DB ="mongodb+srv://creativeprotocol:shuddhi@cluster0-kdlho.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"; 
// const SK = process.env.SK;
var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var session = require('express-session')

const ngodb = require('./db/ngodb')
const ngorouter = require('./router/ngorouter');  
app.use("/",ngorouter);


const port =3000;
app.listen(port, function () {
    console.log("Server has started at port 3000");
  })

