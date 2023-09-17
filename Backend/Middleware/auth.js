const User = require("../Models/user")
const Admin = require("../Models/adminModel")
const jwt = require("jsonwebtoken")

exports.authenticatedUser = async (req, res, next) => {
    try {
        const { userToken } = req.cookies

        if (!userToken) {
            return res.status(401).json({ message: "You are not logged in please login First" })
        }

        const decoded = await jwt.verify(userToken, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id);

        next()

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }

}




exports.authenticateAdmin = async(req, res, next)=> {
  try{
    const { adminToken } = req.cookies

  if (!adminToken) {
      return res.status(401).json({ message: "for This Operation Admin Need to be Login" })
  }

  const decoded = await jwt.verify(adminToken, process.env.JWT_SECRET)
  req.admin = await Admin.findById(decoded._id);

  next()


  }catch(err){
    return res.status(500).json({ success: false, error:err.message})
  }
  
  }









 




