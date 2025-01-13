import express from 'express';
import ProductModel from '../models/productModel.js';

const router = express.Router();

// Fetch all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product
router.post('/api/products', async (req, res) => {
    const { pid, name, image, price, description } = req.body;
    const newProduct = new ProductModel({ pid, name, image, price, description });

    try {
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove a product
router.delete('/api/products/delete/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await ProductModel.findOneAndDelete({ pid });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
