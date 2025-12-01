import api from './api';

export const courseService = {
    // Get all courses with pagination and filters
    getCourses: async (params = {}) => {
        const response = await api.get('/courses', { params });
        return response.data;
    },

    // Get featured courses
    getFeaturedCourses: async () => {
        const response = await api.get('/courses/featured');
        return response.data;
    },

    // Get course categories
    getCategories: async () => {
        const response = await api.get('/courses/categories');
        return response.data;
    },

    // Get course levels
    getLevels: async () => {
        const response = await api.get('/courses/levels');
        return response.data;
    },

    // Get course statistics
    getCourseStats: async () => {
        const response = await api.get('/courses/stats');
        return response.data;
    },

    // Search courses with advanced filters
    searchCourses: async (filters = {}) => {
        const response = await api.get('/courses/search', { params: filters });
        return response.data;
    },

    // Get courses by teacher
    getCoursesByTeacher: async (teacherName) => {
        const response = await api.get(`/courses/teacher/${teacherName}`);
        return response.data;
    },

    // Get related courses
    getRelatedCourses: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/related`);
        return response.data;
    },

    // Get course schedule
    getCourseSchedule: async (courseId) => {
        const response = await api.get(`/courses/${courseId}/schedule`);
        return response.data;
    },

    // Get single course
    getCourse: async (courseId) => {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    },

    // Create course
    createCourse: async (courseData) => {
        const response = await api.post('/courses', courseData);
        return response.data;
    },

    // Update course
    updateCourse: async (courseId, courseData) => {
        const response = await api.put(`/courses/${courseId}`, courseData);
        return response.data;
    },

    // Delete course
    deleteCourse: async (courseId) => {
        const response = await api.delete(`/courses/${courseId}`);
        return response.data;
    }
}; 