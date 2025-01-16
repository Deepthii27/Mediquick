const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const cartRouter = require('./routes/cartRoutes');


const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();


app.use(cors()); // This will apply the specific CORS configuration

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://deepthi:xDzU8KiijjOe672z@deepthi.s9xa4.mongodb.net/mediquick';
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
app.use('/api/cart', cartRouter);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Register route
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on https://mediquick-n6tp.onrender.com/:${PORT}`);
});
