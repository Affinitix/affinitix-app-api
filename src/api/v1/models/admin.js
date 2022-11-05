const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    first_name: String,
    middle_name: String,
    surname_name: String,
    gender: String,
    profile_avatar_url: String,
    country_code: String,
    phone_number: String,
    phone_is_verified: { type: Boolean, default: false },
    phone_verification_code: String,
    email: String,
    email_is_verified: { type: Boolean, default: false },
    email_verification_code: String,
    password: String,
    state: String,
    country: String,
    address: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    is_deleted: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;