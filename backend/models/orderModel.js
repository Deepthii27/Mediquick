const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMode: { type: String },

    cartItems: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number }
        }
    ],
    orderTotal: { type: Number },
    orderStatus: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
