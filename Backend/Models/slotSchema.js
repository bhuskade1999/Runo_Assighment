const mongoose = require('mongoose');

const vaccineSlotSchema = new mongoose.Schema({
  slotDate: {
    type: Date,
    default: Date.now,
  },
  slotTime: {
    type: String,
    required: true,
  },
  doseType: {
    type: String,
    enum: ['First', 'Second'],  
    required: true,
  },
  capacity: {
    type: Number,  
    default: 1,  
  },
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for tracking registered users
  }],
});

module.exports = mongoose.model('VaccineSlot', vaccineSlotSchema);

 