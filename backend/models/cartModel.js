const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    image: String
});

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Associate cart with the user's ID (username or email)
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
