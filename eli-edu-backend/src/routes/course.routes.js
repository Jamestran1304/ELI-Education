const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/course.model');
const User = require('../models/user.model');
const registrationService = require('../services/registration.service');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('teacher', 'name')
            .sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('teacher', 'name');

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create course
router.post('/', [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('level').isIn(['Cơ Bản', 'Trung Cấp', 'Nâng Cao']).withMessage('Invalid level'),
    body('category').trim().notEmpty().withMessage('Category is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update course
router.put('/:id', [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('duration').optional().isNumeric().withMessage('Duration must be a number'),
    body('level').optional().isIn(['Cơ Bản', 'Trung Cấp', 'Nâng Cao']).withMessage('Invalid level')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'price', 'duration', 'level', 'thumbnail'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => course[update] = req.body[update]);
        await course.save();

        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete course
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.remove();
        res.json({ message: 'Course deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get course reviews
router.get('/:id/reviews', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name avatar'
                }
            });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course.reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register for a course
router.post('/:id/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('name').trim().notEmpty().withMessage('Name is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await registrationService.registerUser(req.params.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(error.message === 'Course not found' ? 404 : 400)
            .json({ message: error.message });
    }
});

// Get course registrations
router.get('/:id/registrations', async (req, res) => {
    try {
        const registrations = await registrationService.getCourseRegistrations(req.params.id);
        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(error.message === 'Course not found' ? 404 : 500)
            .json({ message: error.message });
    }
});

// Update registration status
router.patch('/:courseId/registrations/:userId', [
    body('status').isIn(['active', 'completed', 'dropped'])
        .withMessage('Invalid status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await registrationService.updateRegistrationStatus(
            req.params.userId,
            req.params.courseId,
            req.body.status
        );
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(error.message === 'User not found' ? 404 : 400)
            .json({ message: error.message });
    }
});

module.exports = router; 