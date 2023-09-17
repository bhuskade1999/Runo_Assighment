const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken")


const adminSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
});


//before saving do hash password
adminSchema.pre("save", async function(next){
  if(this.isModified("password")){
   this.password = await bcrypt.hash(this.password ,10)
  }
  next();
})


adminSchema.methods.matchPasswordAdmin = async function(password){
  return await bcrypt.compare(password, this.password)
}


adminSchema.methods.adminToken = function(){
  return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
   
}


module.exports = mongoose.model('Admin', adminSchema);

 
