const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Module = require('../models/module.model');
const Course = require('../models/course.model');
const auth = require('../middleware/auth');
const teacherAuth = require('../middleware/teacherAuth');

// Get all modules for a course
router.get('/course/:courseId', async (req, res) => {
    try {
        const modules = await Module.find({ course: req.params.courseId })
            .sort({ order: 1 });

        res.json(modules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get module by ID
router.get('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate('course')
            .populate('prerequisites');

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new module (teacher only)
router.post('/', [auth, teacherAuth], [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('course').notEmpty().withMessage('Course ID is required'),
    body('order').isNumeric().withMessage('Order must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if course exists and teacher owns it
        const course = await Course.findById(req.body.course);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const module = new Module(req.body);
        await module.save();

        // Add module to course
        course.modules.push(module._id);
        await course.save();

        res.status(201).json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update module (teacher only)
router.put('/:id', [auth, teacherAuth], [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('order').optional().isNumeric().withMessage('Order must be a number'),
    body('duration').optional().isNumeric().withMessage('Duration must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(module.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'order', 'duration', 'objectives', 'resources'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => module[update] = req.body[update]);
        await module.save();

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete module (teacher only)
router.delete('/:id', [auth, teacherAuth], async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(module.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Remove module from course
        course.modules = course.modules.filter(
            moduleId => moduleId.toString() !== module._id.toString()
        );
        await course.save();

        await module.remove();
        res.json({ message: 'Module deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add prerequisite to module
router.post('/:id/prerequisites', [auth, teacherAuth], [
    body('prerequisiteId').notEmpty().withMessage('Prerequisite module ID is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(module.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Check if prerequisite exists and belongs to the same course
        const prerequisite = await Module.findById(req.body.prerequisiteId);
        if (!prerequisite || prerequisite.course.toString() !== module.course.toString()) {
            return res.status(400).json({ message: 'Invalid prerequisite module' });
        }

        if (module.prerequisites.includes(req.body.prerequisiteId)) {
            return res.status(400).json({ message: 'Prerequisite already added' });
        }

        module.prerequisites.push(req.body.prerequisiteId);
        await module.save();

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove prerequisite from module
router.delete('/:id/prerequisites/:prerequisiteId', [auth, teacherAuth], async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Check if teacher owns the course
        const course = await Course.findById(module.course);
        if (course.teacher.name !== req.user.name) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        module.prerequisites = module.prerequisites.filter(
            prerequisiteId => prerequisiteId.toString() !== req.params.prerequisiteId
        );
        await module.save();

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 