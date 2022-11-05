const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    auth_icon: mongoose.Schema.Types.ObjectId,
    state: String,
    country: String,
    address: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    },
    current_sub_plan: { type: String, default: "free" },
    total_memory_space_in_gb: Number,
    used_memory_space_in_gb: { type: Number, default: 0 },
    is_deleted: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const User = mongoose.model('User', userSchema);

module.exports = User;