const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    user_email: String,
    user_role: String,
    user_id: mongoose.Schema.Types.ObjectId,
    reset_code: String,
    is_verified: { type: Number, default: 0 },
    sent_date: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;