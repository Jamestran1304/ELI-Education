import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Course API
export const courseApi = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    register: (courseId, userData) => api.post(`/courses/${courseId}/register`, userData),
    getRegistrations: (courseId) => api.get(`/courses/${courseId}/registrations`),
    updateRegistrationStatus: (courseId, userId, status) =>
        api.patch(`/courses/${courseId}/registrations/${userId}`, { status })
};

// User API
export const userApi = {
    getById: (id) => api.get(`/users/${id}`),
    getRegistrations: (userId) => api.get(`/users/${userId}/registrations`)
};

// Module API
export const moduleApi = {
    getByCourse: (courseId) => api.get(`/modules/course/${courseId}`),
    getById: (id) => api.get(`/modules/${id}`),
    create: (moduleData) => api.post('/modules', moduleData),
    update: (id, moduleData) => api.put(`/modules/${id}`, moduleData),
    delete: (id) => api.delete(`/modules/${id}`)
};

// Lesson API
export const lessonApi = {
    getByModule: (moduleId) => api.get(`/lessons/module/${moduleId}`),
    getById: (id) => api.get(`/lessons/${id}`),
    create: (lessonData) => api.post('/lessons', lessonData),
    update: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
    delete: (id) => api.delete(`/lessons/${id}`)
};

// Review API
export const reviewApi = {
    getByCourse: (courseId) => api.get(`/reviews/course/${courseId}`),
    getById: (id) => api.get(`/reviews/${id}`),
    create: (reviewData) => api.post('/reviews', reviewData),
    update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
    delete: (id) => api.delete(`/reviews/${id}`)
};

export default api; 