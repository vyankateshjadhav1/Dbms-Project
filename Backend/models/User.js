const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['supervisor', 'member'],
        default: 'member'
    },
    clubId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Club' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;