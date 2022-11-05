const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
    icon_url: String,
    is_deleted: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;