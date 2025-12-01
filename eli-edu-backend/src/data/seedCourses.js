const mongoose = require('mongoose');
const Course = require('../models/course.model');

// MongoDB connection string from server.js
const dbURI = 'mongodb+srv://tlngocbao123:B%40o130400@eli-edu.amc8t4b.mongodb.net/eli-edu?retryWrites=true&w=majority';

const courses = [
    {
        id: '60d5ecb73e1e9c0015b0f7b1',
        title: 'English Language Fundamentals',
        category: 'Language',
        level: 'Beginner',
        duration: '12 weeks',
        price: 499,
        image: '/courses/english.jpg',
        description: 'Master the basics of English language with our comprehensive beginner course.',
        rating: 4.5,
        reviews: 128,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên A', avatar: 'https://i.pravatar.cc/50?img=a' },
    },
    {
        id: '60d5ecb73e1e9c0015b0f7b2',
        title: 'Advanced Business English',
        category: 'business',
        level: 'Advanced',
        duration: '16 weeks',
        price: 699,
        image: '/courses/business.jpg',
        description: 'Develop professional communication skills for the global workplace.',
        rating: 4.2,
        reviews: 96,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên B', avatar: 'https://i.pravatar.cc/50?img=b' },
    },
    {
        id: '60d5ecb73e1e9c0015b0f7b3',
        title: 'Academic Writing',
        category: 'academic',
        level: 'Intermediate',
        duration: '14 weeks',
        price: 599,
        image: '/courses/writing.jpg',
        description: 'Learn to write research papers, essays, and academic reports.',
        rating: 4.0,
        reviews: 72,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên C', avatar: 'https://i.pravatar.cc/50?img=c' },
    },
    {
        id: '60d5ecb73e1e9c0015b0f7b4',
        title: 'IELTS Preparation',
        category: 'exam',
        level: 'All Levels',
        duration: '10 weeks',
        price: 799,
        image: '/courses/ielts.jpg',
        description: 'Comprehensive preparation for the IELTS examination.',
        rating: 4.3,
        reviews: 104,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên D', avatar: 'https://i.pravatar.cc/50?img=d' },
    },
    {
        id: '60d5ecb73e1e9c0015b0f7b5',
        title: 'Conversational English',
        category: 'language',
        level: 'Intermediate',
        duration: '8 weeks',
        price: 399,
        image: '/courses/conversation.jpg',
        description: 'Improve your speaking and listening skills through interactive sessions.',
        rating: 4.1,
        reviews: 64,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên E', avatar: 'https://i.pravatar.cc/50?img=e' },
    },
    {
        id: '60d5ecb73e1e9c0015b0f7b6',
        title: 'English for Specific Purposes',
        category: 'business',
        level: 'Advanced',
        duration: '12 weeks',
        price: 649,
        image: '/courses/specialized.jpg',
        description: 'Specialized English courses for various professional fields.',
        rating: 4.4,
        reviews: 80,
        schedule: [
            { day: 'Thứ Hai', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Tư', time: '10:00 SA - 12:00 CH' },
            { day: 'Thứ Sáu', time: '10:00 SA - 12:00 CH' },
        ],
        instructor: { name: 'Giảng viên F', avatar: 'https://i.pravatar.cc/50?img=f' },
    },
];

// Map frontend data to backend schema
const coursesToInsert = courses.map(course => ({
    _id: new mongoose.Types.ObjectId(course.id), // Use frontend ID as MongoDB _id
    title: course.title,
    description: course.description,
    shortDescription: course.description, // Using full description as short description for simplicity
    thumbnail: course.image || '/placeholder.jpg', // Use image from frontend or placeholder
    price: course.price,
    duration: parseInt(course.duration.split(' ')[0], 10), // Extract number from duration string
    level: course.level === 'Beginner' ? 'Cơ Bản' : course.level === 'Intermediate' ? 'Trung Cấp' : 'Nâng Cao', // Translate level
    category: course.category,
    // Omitting fields not in frontend data or requiring references (modules, features, requirements, whatYouWillLearn, startDate, endDate, schedule, maxStudents, currentStudents, language, teacher, highlights, testimonials, faq) or providing defaults/placeholders if required.
    // Adding minimal required fields or defaults based on schema:
    modules: [], // Required array, empty for now
    features: [], // Required array, empty for now
    requirements: [], // Required array, empty for now
    whatYouWillLearn: [], // Required array, empty for now
    isPublished: true, // Default is true
    language: 'en', // Changed from 'Tiếng Việt' to 'en' to avoid unsupported language override error
    highlights: [],
    testimonials: [],
    faq: []
}));

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected for seeding.');

        // Optional: Clear existing courses before inserting
        // await Course.deleteMany({});
        // console.log('Existing courses cleared.');

        const result = await Course.insertMany(coursesToInsert);
        console.log(`Successfully inserted ${result.length} courses.`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDatabase(); 