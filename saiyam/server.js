// const MONGO_DB ="mongodb+srv://creativeprotocol:shuddhi@cluster0-kdlho.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"; 
// const SK = process.env.SK;
var express = require('express')
var app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))
var fs = require('fs')
var path = require('path')

var session = require('express-session')
var _ = require("lodash")


var bodyParser = require("body-parser")

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))
const secret = 'abcdefg';

app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());

const port =3000;
app.listen(port, function () {
    console.log("Server has started at port 3000");
  });