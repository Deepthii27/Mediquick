const express = require('express');
const mongoose = require('mongoose');
const orderModel = require('../models/orderModel');

const router = express.Router();

// API endpoint to fetch all orders
router.get('/orders', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await orderModel.find({});

        // Send orders as JSON response
        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to fetch orders", status: 500 });
    }
});

// API endpoint to handle form submission
router.post('/create', async (req, res) => {
    try {
        const { body } = req;

        console.log("Checkout_body", body);

        // Validate required fields
        // if (!body?.firstName || !body?.lastName || !body?.address || !body?.email || !body?.phone || !body?.cartItems || !body?.orderTotal) {
        //     return res.status(400).send({ message: "Missing Fields", status: 400 });
        // }

        // Ensure cartItems is an array and contains items
        if (!Array.isArray(body?.cartItems) || body.cartItems.length === 0) {
            return res.status(400).send({ message: "Cart items cannot be empty", status: 400 });
        }

        // Create new order entry
        const billingEntry = new orderModel({
            firstName: body?.firstName,
            lastName: body?.lastName,
            address: body?.address,
            email: body?.email,
            phone: body?.phone,
            paymentMode: body?.paymentMode,
            cartItems: body?.cartItems,
            orderTotal: body?.orderTotal,
            orderDate: new Date(),
        });

        console.log("New Data", billingEntry);

        // Save the new order
        await billingEntry.save();

        // Send success response
        res.status(201).send({ message: "Billing data saved successfully!", status: 201 });

    } catch (err) {
        console.log(err);

        // Avoid sending response if already sent
        if (!res.headersSent) {
            return res.status(500).send({ message: "Failed to save Billing data!", status: 500 });
        }
    }
});

module.exports = router;
