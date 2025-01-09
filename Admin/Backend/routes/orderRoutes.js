import express from 'express';
import OrderModel from '../models/OrderModel.js';



const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:orderId', async (req, res) => {
  try {
      const order = await OrderModel.findById(req.params.orderId);
      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

// Route to delete an order by ID
router.delete('/:orderId', async (req, res) => {
  try {
      const orderId = req.params.orderId;

      const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

      if (!deletedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});


export default router;
