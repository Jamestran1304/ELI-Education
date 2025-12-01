const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../models/review.model');
const Course = require('../models/course.model');
const auth = require('../middleware/auth');
const teacherAuth = require('../middleware/teacherAuth');

// Get all reviews for a course
router.get('/course/:courseId', async (req, res) => {
    try {
        const reviews = await Review.find({ course: req.params.courseId })
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user', 'name avatar')
            .populate('course');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new review
router.post('/', auth, [
    body('course').notEmpty().withMessage('Course ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if course exists
        const course = await Course.findById(req.body.course);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user is enrolled in the course
        const isEnrolled = course.enrolledStudents.includes(req.user.userId);
        if (!isEnrolled) {
            return res.status(403).json({ message: 'Must be enrolled to review' });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({
            user: req.user.userId,
            course: req.body.course
        });

        if (existingReview) {
            return res.status(400).json({ message: 'Already reviewed this course' });
        }

        const review = new Review({
            ...req.body,
            user: req.user.userId
        });

        await review.save();

        // Add review to course
        course.reviews.push(review._id);
        await course.save();

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update review
router.put('/:id', auth, [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['rating', 'title', 'content'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => review[update] = req.body[update]);
        await review.save();

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns the review
        if (review.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Remove review from course
        const course = await Course.findById(review.course);
        course.reviews = course.reviews.filter(
            reviewId => reviewId.toString() !== review._id.toString()
        );
        await course.save();

        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Like/Unlike review
router.post('/:id/like', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const likeIndex = review.likes.indexOf(req.user.userId);
        if (likeIndex === -1) {
            review.likes.push(req.user.userId);
        } else {
            review.likes.splice(likeIndex, 1);
        }

        await review.save();
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify review (teacher only)
router.post('/:id/verify', [auth, teacherAuth], async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(review.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        review.isVerified = true;
        await review.save();

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 