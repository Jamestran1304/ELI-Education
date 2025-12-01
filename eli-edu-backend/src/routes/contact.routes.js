const express = require('express');
const contactController = require('../controllers/contact.controller');

const router = express.Router();

// Submit contact form
router.post('/', contactController.submitContact);

// Get all contact submissions
router.get('/', contactController.getContacts);

// Mark contact as read
router.put('/:id/read', contactController.markAsRead);

module.exports = router; 