const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Create new user
router.post('/', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email')
], authController.createUser);

// Get user by ID
router.get('/:id', authController.getUser);

// Update user
router.put('/:id', [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email')
], authController.updateUser);

// Delete user
router.delete('/:id', authController.deleteUser);

module.exports = router; 