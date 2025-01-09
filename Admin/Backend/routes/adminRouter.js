// routes/adminRouter.js
import express from 'express';
import Order from '../models/adminModel.js';

const router = express.Router();

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Add a new order
router.post('/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add order' });
    }
});

// Update an order
router.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update order' });
    }
});

export default router;
