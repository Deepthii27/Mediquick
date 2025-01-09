import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
