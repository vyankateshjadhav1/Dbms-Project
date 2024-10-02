const moongoose = require('mongoose');

const applicationStatusSchema = new moongoose.Schema({
    club_id: { type: moongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    student_id: { type: moongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['applied', 'accepted', 'rejected'], default: 'applied' },
});

module.exports = moongoose.model('ApplicationStatus', applicationStatusSchema);