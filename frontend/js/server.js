const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = 'mongodb+srv://deepthi:xDzU8KiijjOe672z@deepthi.s9xa4.mongodb.net/mediquick'; // Replace with your MongoDB connection string
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema for billing details
const BillingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMode: { type: String, required: true },
    upiId: { type: String, required: false },
    cartItems: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    orderTotal: { type: Number, required: true },
});

// Import routes
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/auth', authRoutes);

// Create a model
const Billing = mongoose.model('Billing', BillingSchema);

// API endpoint to handle form submission
app.post('/checkout', async (req, res) => {
    try {
        const billingData = req.body;

        // Create a new billing entry
        const billingEntry = new Billing(billingData);
        await billingEntry.save();

        res.status(201).send({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error saving billing details:', error);
        res.status(500).send({ error: 'Failed to place order.' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on https://mediquick-n6tp.onrender.com/:${PORT}`);
});
