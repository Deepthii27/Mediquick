const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();


app.use(cors()); // This will apply the specific CORS configuration

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/local';
console.log("MongoDB", MONGO_URI)
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Import routes
const productRoutes = require('./routes/productRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes'); // Import checkout routes
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes

// Use routes
app.use('/api/products', productRoutes); // Product routes
app.use('/checkout', checkoutRoutes); // Checkout routes
app.use('/contact', contactRoutes); // Contact routes


// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
