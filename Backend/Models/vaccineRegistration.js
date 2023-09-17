const mongoose = require('mongoose');

const vaccineRegistrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for tracking which user registered
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VaccineSlot', // Reference to the VaccineSlot model for tracking the slot
    required: true,
  },
  doseType: {
    type: String,
    enum: ['First', 'Second'],  
    required: true,
  },
  slotDate: {
    type: Date,
    default: Date.now,
  },
  slotTime: {
    type: String,
 
  }

});

module.exports = mongoose.model('VaccineRegistration', vaccineRegistrationSchema);


