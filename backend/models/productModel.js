const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    pid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', ProductSchema);
