const express = require('express');
const ProductModel = require('../models/productModel');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get a product by PID
router.post('/pid', async (req, res) => {
    const { pid } = req.body;
    try {
        const product = await ProductModel.findOne({ pid });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Add a new product
router.post('/new', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

module.exports = router;
