const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Lesson = require('../models/lesson.model');
const Module = require('../models/module.model');
const Course = require('../models/course.model');
const auth = require('../middleware/auth');
const teacherAuth = require('../middleware/teacherAuth');

// Get all lessons for a module
router.get('/module/:moduleId', async (req, res) => {
    try {
        const lessons = await Lesson.find({ module: req.params.moduleId })
            .sort({ order: 1 });

        res.json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get lesson by ID
router.get('/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate('module')
            .populate('course');

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new lesson (teacher only)
router.post('/', [auth, teacherAuth], [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('module').notEmpty().withMessage('Module ID is required'),
    body('course').notEmpty().withMessage('Course ID is required'),
    body('order').isNumeric().withMessage('Order must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if module and course exist
        const [module, course] = await Promise.all([
            Module.findById(req.body.module),
            Course.findById(req.body.course)
        ]);

        if (!module || !course) {
            return res.status(404).json({ message: 'Module or course not found' });
        }

        // Check if teacher owns the course
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const lesson = new Lesson(req.body);
        await lesson.save();

        // Add lesson to module
        module.lessons.push(lesson._id);
        await module.save();

        res.status(201).json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update lesson (teacher only)
router.put('/:id', [auth, teacherAuth], [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
    body('order').optional().isNumeric().withMessage('Order must be a number'),
    body('duration').optional().isNumeric().withMessage('Duration must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(lesson.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'content', 'order', 'duration', 'videoUrl', 'resources', 'attachments', 'quiz'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => lesson[update] = req.body[update]);
        await lesson.save();

        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete lesson (teacher only)
router.delete('/:id', [auth, teacherAuth], async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(lesson.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Remove lesson from module
        const module = await Module.findById(lesson.module);
        module.lessons = module.lessons.filter(
            lessonId => lessonId.toString() !== lesson._id.toString()
        );
        await module.save();

        await lesson.remove();
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add quiz to lesson
router.post('/:id/quiz', [auth, teacherAuth], [
    body('question').trim().notEmpty().withMessage('Question is required'),
    body('options').isArray().withMessage('Options must be an array'),
    body('correctAnswer').isNumeric().withMessage('Correct answer must be a number'),
    body('explanation').trim().notEmpty().withMessage('Explanation is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(lesson.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        lesson.quiz.push(req.body);
        await lesson.save();

        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove quiz from lesson
router.delete('/:id/quiz/:quizId', [auth, teacherAuth], async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(lesson.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        lesson.quiz = lesson.quiz.filter(
            quiz => quiz._id.toString() !== req.params.quizId
        );
        await lesson.save();

        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 