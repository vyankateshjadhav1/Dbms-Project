const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  club_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['applied', 'member'], default: 'applied' },
});

module.exports = mongoose.model('Membership', membershipSchema);
