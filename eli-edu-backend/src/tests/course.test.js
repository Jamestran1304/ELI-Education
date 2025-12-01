const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Course API', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eli-edu-test');
    });

    afterAll(async () => {
        // Close database connection
        await mongoose.connection.close();
    });

    describe('GET /api/courses', () => {
        it('should return all courses', async () => {
            const res = await request(app)
                .get('/api/courses')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    describe('POST /api/courses', () => {
        it('should create a new course', async () => {
            const courseData = {
                title: 'Test Course',
                description: 'Test Description',
                shortDescription: 'Short Test Description',
                thumbnail: 'test.jpg',
                price: 100,
                duration: 4,
                level: 'Cơ Bản',
                category: 'Test Category'
            };

            const res = await request(app)
                .post('/api/courses')
                .send(courseData)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(res.body.title).toBe(courseData.title);
            expect(res.body.price).toBe(courseData.price);
        });
    });
}); 