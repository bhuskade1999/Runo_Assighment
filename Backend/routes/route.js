
const express = require('express');

const router = express.Router()

const {authenticateAdmin,authenticatedUser} = require("../Middleware/auth")

const {userRegisters,login,logoutUser,logoutAdmin,adminLogin } = require("../Controller/userController")
 
const {
    createVaccineSlot,
    vaccineRegister,
    getTotalRegsiter,
    updateSlot,
    getAvailableSlots } = require("../Controller/VaccineController")



/*------------------------ (User Controller) -----------------------------------*/

router.route("/user/register").post(userRegisters)
router.route("/user/login").post(login)
router.route("/user/logout").get(logoutUser)
router.route("/user/registerVaccine").post(authenticatedUser,vaccineRegister)
router.route("/user/updateSlot").put(authenticatedUser,updateSlot)
router.route("/user/availableSlot").get(authenticatedUser,getAvailableSlots)

/*-------------------------------- (Admin ) ----------------------------*/

router.route("/admin/adminLogin").post(adminLogin)
router.route("/admin/logout").get(logoutAdmin)
router.route("/admin/createSlot").post(authenticateAdmin,createVaccineSlot)
router.route("/admin/totalRegistered").get(authenticateAdmin,getTotalRegsiter) // get total user registered and also filter by criteria



 

module.exports = router