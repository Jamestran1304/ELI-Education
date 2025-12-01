const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completedLessons: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        completedAt: {
            type: Date,
            default: Date.now
        },
        quizScore: {
            type: Number,
            min: 0,
            max: 100
        }
    }],
    currentLesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    overallProgress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    },
    certificates: [{
        name: String,
        issuedAt: Date,
        url: String
    }],
    notes: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Ensure one progress record per user per course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress; 