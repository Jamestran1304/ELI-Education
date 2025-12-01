const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    videoUrl: {
        type: String
    },
    resources: [{
        title: String,
        url: String,
        type: String // pdf, doc, link, etc.
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    quiz: [{
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String
    }],
    attachments: [{
        name: String,
        url: String,
        type: String
    }]
}, {
    timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson; 