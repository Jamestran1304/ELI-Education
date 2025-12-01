const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Course = require('../models/course.model');
const Module = require('../models/module.model');
const Lesson = require('../models/lesson.model');
const Review = require('../models/review.model');
const Progress = require('../models/progress.model');

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Course.deleteMany({}),
            Module.deleteMany({}),
            Lesson.deleteMany({}),
            Review.deleteMany({}),
            Progress.deleteMany({})
        ]);

        // Create users
        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                avatar: 'admin-avatar.jpg'
            },
            {
                name: 'Teacher One',
                email: 'teacher@example.com',
                password: 'teacher123',
                role: 'teacher',
                avatar: 'teacher-avatar.jpg'
            },
            {
                name: 'Student One',
                email: 'student@example.com',
                password: 'student123',
                role: 'student',
                avatar: 'student-avatar.jpg'
            }
        ]);

        // Create courses
        const courses = await Course.create([
            {
                title: 'Web Development Bootcamp',
                description: 'Learn full-stack web development from scratch',
                shortDescription: 'Master web development in 12 weeks',
                thumbnail: 'web-dev.jpg',
                price: 4990000,
                duration: 12,
                level: 'Cơ Bản',
                category: 'Lập Trình Web',
                teacher: {
                    name: users[1].name,
                    avatar: users[1].avatar,
                    bio: '5 years of teaching experience'
                },
                features: [
                    'Học trực tiếp với giảng viên',
                    'Dự án thực tế',
                    'Chứng chỉ sau khi hoàn thành'
                ],
                requirements: [
                    'Máy tính cá nhân',
                    'Kết nối internet ổn định'
                ]
            },
            {
                title: 'Data Science Fundamentals',
                description: 'Introduction to data science and machine learning',
                shortDescription: 'Start your data science journey',
                thumbnail: 'data-science.jpg',
                price: 5990000,
                duration: 16,
                level: 'Trung Cấp',
                category: 'Khoa Học Dữ Liệu',
                teacher: {
                    name: users[1].name,
                    avatar: users[1].avatar,
                    bio: 'Data Scientist with 8 years experience'
                }
            }
        ]);

        // Create modules
        const modules = await Module.create([
            {
                title: 'HTML & CSS Basics',
                description: 'Learn the fundamentals of web markup and styling',
                course: courses[0]._id,
                order: 1,
                duration: 120,
                objectives: [
                    'Understand HTML structure',
                    'Master CSS styling',
                    'Create responsive layouts'
                ]
            },
            {
                title: 'JavaScript Fundamentals',
                description: 'Master JavaScript programming basics',
                course: courses[0]._id,
                order: 2,
                duration: 180,
                objectives: [
                    'Learn JavaScript syntax',
                    'Understand DOM manipulation',
                    'Master event handling'
                ]
            }
        ]);

        // Create lessons
        const lessons = await Lesson.create([
            {
                title: 'Introduction to HTML',
                description: 'Learn HTML basics and structure',
                content: 'HTML is the standard markup language for creating web pages...',
                duration: 45,
                videoUrl: 'https://example.com/video1',
                course: courses[0]._id,
                module: modules[0]._id,
                order: 1,
                isPublished: true,
                quiz: [
                    {
                        question: 'What does HTML stand for?',
                        options: [
                            'Hyper Text Markup Language',
                            'High Tech Modern Language',
                            'Hyper Transfer Markup Language'
                        ],
                        correctAnswer: 0,
                        explanation: 'HTML stands for Hyper Text Markup Language'
                    }
                ]
            }
        ]);

        // Create reviews
        const reviews = await Review.create([
            {
                user: users[2]._id,
                course: courses[0]._id,
                rating: 5,
                title: 'Excellent Course!',
                content: 'This course helped me start my web development career',
                isVerified: true
            }
        ]);

        // Create progress
        const progress = await Progress.create([
            {
                user: users[2]._id,
                course: courses[0]._id,
                completedLessons: [{
                    lesson: lessons[0]._id,
                    completedAt: new Date(),
                    quizScore: 90
                }],
                currentLesson: lessons[0]._id,
                overallProgress: 25,
                notes: [{
                    lesson: lessons[0]._id,
                    content: 'Great introduction to HTML!'
                }]
            }
        ]);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Connect to MongoDB and run seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eli-edu')
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }); 