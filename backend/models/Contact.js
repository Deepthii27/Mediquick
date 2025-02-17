const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);