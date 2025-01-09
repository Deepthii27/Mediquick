// models/adminModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMode: { type: String, required: true },
    cartItems: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number }
        }
    ], orderTotal: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
