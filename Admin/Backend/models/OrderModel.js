import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totNum: { type: Number, required: true },
  tableNumber: { type: String, required: true },
  request: { type: String },
  totalAmount: { type: Number, required: true },
  payment: { type: String, enum: ['delivery', 'online', 'cash'], required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
