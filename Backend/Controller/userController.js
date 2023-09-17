const UserModel = require("../Models/user")
const adminModel = require("../Models/adminModel")


/* ------------------------------- Create User ----------------------------- */

exports.userRegisters = async (req, res) => {
  try {
    const { name, mobNumber, age, password,pincode,aadharNo,vaccinationStatus} = req.body

      //checking number already exist or not
    let checkMobile = await UserModel.findOne({mobNumber})
    if (checkMobile) return res.status(400).json({ success: false, message: "number already Exists" })
  
    //checking adhar number exist or not
    let checkAdhar= await UserModel.findOne({aadharNo})
    if (checkAdhar) return res.status(400).json({ success: false, message: "This Adhar Number is Already exists" })

    let user = new UserModel({ 
        name, 
        mobNumber, 
        age, 
        password,
        pincode,
        aadharNo,
        vaccinationStatus
      })
      
    await user.save()
    res.status(201).json({success:true, user})

  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



/* ------------------------------- Login User ----------------------------- */

exports.login = async (req, res) => {
    try {
  
      const { mobNumber, password } = req.body

      const user = await UserModel.findOne({ mobNumber: mobNumber  });

      if (!user) return res.status(400).json({ success: false, message: "User does not Exists" })
  
      const isMatch = await user.matchPassword(password)
  
      if (!isMatch) return res.status(400).json({ success: false, message: "Password is incorrect" })
  
      const userToken = await user.generateToken()
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }
  
      res.status(200)
        .cookie("userToken", userToken, options)
        .json({ success: true, user, userToken })
  
    } catch (err) {
      return res.status(500).send({ success: false, message: err.message });
    }
  }



  //================================ Admin Login ==============================================

  
  exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {

      let checkAdmin = await adminModel.findOne({ username : username })
      if(!checkAdmin)  return res.status(400).json({ success: false, message: "Admin Credintial are inCorrect" })
     
      const isMatch = await checkAdmin.matchPasswordAdmin(password)
  
      if (!isMatch) return res.status(400).json({ success: false, message: "Password is incorrect" })
  
      const adminToken = await checkAdmin.adminToken()
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }
  
      res.status(200)
        .cookie("adminToken", adminToken, options)
        .json({ success: true, checkAdmin, adminToken })
  
       
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  /* ---------------------------------- LogOut User --------------------------------- */

exports.logoutUser = async (req, res) => {
  try {
    res.status(200)
      .cookie("userToken", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "User Logged Out successfully" })

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
},


exports.logoutAdmin = async (req, res) => {
  try {
    res.status(200)
      .cookie("adminToken", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Admin Logged Out successfully" })

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
}
  


  

  