const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();

// Get the cart for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            res.json(cart);
        } else {
            res.json({ items: [] }); // Return an empty cart if not found
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add or update an item in the cart
router.post('/:userId', async (req, res) => {
    const { items } = req.body; // Cart items

    try {
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (cart) {
            // Update the existing cart
            cart.items = items;
        } else {
            // Create a new cart for the user
            cart = new Cart({
                userId: req.params.userId,
                items
            });
        }

        await cart.save();
        res.status(200).send('Cart updated');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete an item from the cart
router.delete('/:userId/:itemId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        res.status(200).send('Item removed');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
