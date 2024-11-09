const  mongoose  = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
 const Schema = mongoose.Schema;
let UserSchema = new Schema({
    
    gender:{
        type:String
    },
    name:{
        type:String,
        required:true
    }
})
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);