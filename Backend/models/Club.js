const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    domain: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
        required: true
    }],
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;