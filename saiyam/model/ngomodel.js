const mongoose = require('mongoose');

const NgoSchema = new mongoose.Schema({
    name: String,
    regno : {
        type: Number,
        unique: true
    },
    regcert:{
        type: String,
        default: "./default.png"
    },
    cert12a:{
        type: String,
        default: "./default.png"
    },
    cert80g:{
        type: String,
        default: "/default.png"
    },
    fcra:{
        type: String,
        default: "/default.png"
    },
    acname:{
        type: String
    },
    acno: {
        type: Number
    },
    ifsccode:{
        type: String
    },
    bankadd:{
        type: String
    },
    authperson:{
        type: String
    },
    phno:{
        type: Number
    },
    email: {
        type: String,
        // required:true
    },
    password: {
        type: String,
        select: false,
      },
    confirmPassword: {
        type: String,
        validate: function () {
          return this.password == this.confirmPassword;
        },
      },
      description:{
        type: String
    }
});

const Ngo = mongoose.model('Ngo', NgoSchema);
module.exports = Ngo;