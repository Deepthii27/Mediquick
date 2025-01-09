const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST Route to handle form submissions
router.post('/submit', async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        }

        // Save contact details to MongoDB
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            subject,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact details submitted successfully.' });
    } catch (error) {
        console.error('Error saving contact details:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
});

module.exports = router;
