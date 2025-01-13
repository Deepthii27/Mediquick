const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');



dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//******* */
const productRoutes = require('./routes/productRoute');
app.use('/api/products', productRoutes);
//*********// */

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend Server is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on https://mediquick-n6tp.onrender.com/:${PORT}`);
});

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
// });

