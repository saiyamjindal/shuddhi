const mongoose = require('mongoose');

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