const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const crypto = require('crypto');
const url = require('url');


mongoose
  .connect('mongodb://localhost:27017/newdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    // console.log(db);
    console.log("ngodb connected");
  })
  .catch(function (err) {
    console.log(err);
});


const NgoSchema = new Schema({
    name: String,
    regno : {
        type: Number,
        unique: true,
        required: true
    },
    regcert:{
        type: String,
        default: "/default.png",
        // required: true
    },
    cert12a:{
        type: String,
        default: "/default.png",
        // required: true
    },
    cert80g:{
        type: String,
        default: "/default.png",
        // required: true
    },
    fcra:{
        type: String,
        default: "/default.png",
        // required: true
    },
    acname:{
        type: String,
        required: true
    },
    acno: {
        type: Number,
        required: true
    },
    ifsccode:{
        type: String,
        required: true
    },
    bankadd:{
        type: String,
        required: true
    },
    authperson:{
        type: String,
        required: true
    },
    phno:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
        select: false,
      },
      confirmPassword: {
        type: String,
        validate: function () {
          return this.password == this.confirmPassword;
        },
        required: true,
      },
      description:{
        type: String
    }
});

const Ngo = mongoose.model('Ngo', NgoSchema);

module.exports = Ngo;