const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken")


const UsersSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      mobNumber: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      aadharNo: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      vaccinationStatus: {
        type: String,
        enum: ['None', 'First', 'Second',"Completed"],
        default: 'None'
      }
})


//before saving do hash password
UsersSchema.pre("save", async function(next){
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password ,10)
    }
    next();
})


UsersSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


UsersSchema.methods.generateToken = function(){
   return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    
}


module.exports = mongoose.model('User', UsersSchema);