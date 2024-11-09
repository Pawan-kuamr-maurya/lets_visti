let mongoose = require("mongoose")
let listing= require("../module/listing")
let insitdata= require("./sampledata.js")
 mongoose.connect('mongodb://127.0.0.1:27017/newdata')
  .then(() => console.log('Connected!'));

 async function creade(params) {
   //await listing.deleteMany({});
   await listing.insertMany(insitdata.data)
   console.log("data insert");
  }
  creade();