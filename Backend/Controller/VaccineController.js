
const vaccineModel = require("../Models/vaccineRegistration")
const slotModel = require("../Models/slotSchema")
const UserModel = require("../Models/user")

/* -------------------------- (Register for a vaccine slot API)------------------------- */

exports.vaccineRegister = async (req, res) => {
  try {

    let { userId, slotId, doseType, slotDate, slotTime } = req.body;

    userId = req.user._id

    const [day, month, year] = slotDate.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const existingReg = await vaccineModel.findOne({ userId, slotId });

    if (existingReg) {
      return res.status(400).json({ error: 'User is already registered for this slot' });
    }

    const slot = await slotModel.findById(slotId);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    if (slot.registeredUsers.length >= slot.capacity) {
      return res.status(400).json({ error: 'No Slot is Available' });
    }

    const registration = new vaccineModel({
      userId,
      slotId,
      doseType,
      slotDate: parsedDate,
      slotTime
    });

    await registration.save();


    let checkUser = await UserModel.findById(userId)
    checkUser.vaccinationStatus = "First"
    await checkUser.save();

    // Add the user to the registered users list for the slot
    slot.registeredUsers.push(userId);
    await slot.save();

    res.status(201).json({ status: true, message: 'Registration successful', registration });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




/* ----------------------( Create a new vaccine slot API - admin part )----------- */

exports.createVaccineSlot = async (req, res) => {
  try {
    let { slotDate, slotTime, doseType, capacity } = req.body;

    const [day, month, year] = slotDate.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    slotDate = parsedDate


    // Check if the slot already exists for the given date, time, and dose type
    const existingSlot = await slotModel.findOne({ slotDate, slotTime, doseType });

    if (existingSlot) {
      return res.status(400).json({ error: 'Slot already exists for this date, time, and dose type' });
    }

    // Create a new slot
    const newSlot = new slotModel({ slotDate, slotTime, doseType, capacity });
    await newSlot.save();

    res.status(201).json({ message: 'Slot created successfully', newSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};





/* ----------------------( Update Slot )----------- */
exports.updateSlot = async (req, res) => {
  try {
    let { slotId, slotDate } = req.body
    userId = req.user._id

    let existingSlot = await vaccineModel.findOne({ userId, slotId })

    if (existingSlot) {
      const userRegisteredTime = new Date(existingSlot.slotDate);
      const newSlotTime = new Date(slotDate);
      const currentTime = new Date();
      const timeDifference = userRegisteredTime - currentTime;

      console.log(timeDifference)

      if (timeDifference <= 24 * 60 * 60 * 1000) {

        const [day, month, year] = slotDate.split('-');
        const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

        if (isNaN(parsedDate)) {
          return res.status(400).json({ error: 'Invalid date format' });
        }
        slotDate = parsedDate
        existingSlot.slotDate = slotDate
        await existingSlot.save()
        return res.status(200).json({ existingSlot })

      } else {
        return res.status(400).json({ error: 'updation time is over now you can not change the slot' })
      }


    } else {
      return res.status(404).json({ error: 'No Slot Found' })

    }

  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}





/* ------------------------- (get all the user regsitered and Filter Users)------------------------------- */
exports.getTotalRegsiter = async (req, res) => {
  try {

    const filterCriteria = {};

    if (req.query.age) {
      filterCriteria.age = req.query.age; // Filter by age
    }

    if (req.query.pincode) {
      filterCriteria.pincode = req.query.pincode; // Filter by pincode
    }

    if (req.query.vaccinationStatus) {
      filterCriteria.vaccinationStatus = req.query.vaccinationStatus; // Filter by vaccination status
    }

    const filteredUsers = await UserModel.find(filterCriteria);
    if (filteredUsers.length === 0) return res.status(404).json({ message: "No User Found" })

    res.json({ count: filteredUsers.length, filteredUsers });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/* ---------------------------- (Get Available Slots) ----------------------------------*/

exports.getAvailableSlots = async (req, res) => {
  try {
   
    const availableSlots = await slotModel.find({
      slotDate: req.query.date,  
      slotTime: req.query.time,  
      doseType: req.query.doseType,  
      capacity: { $gt: 0 },  
    });

   return  res.status(200).json({ availableSlots });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};