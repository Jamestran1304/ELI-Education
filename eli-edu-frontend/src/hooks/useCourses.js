import { useState, useCallback } from 'react';
import { courseService } from '../services/courseService';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    // Get all courses with filters
    const fetchCourses = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getCourses(params);
            setCourses(response.data);
            setPagination(response.pagination);
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải khóa học');
        } finally {
            setLoading(false);
        }
    }, []);

    // Get featured courses
    const fetchFeaturedCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getFeaturedCourses();
            setCourses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải khóa học nổi bật');
        } finally {
            setLoading(false);
        }
    }, []);

    // Search courses
    const searchCourses = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.searchCourses(filters);
            setCourses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tìm kiếm khóa học');
        } finally {
            setLoading(false);
        }
    }, []);

    // Get course by ID
    const getCourse = useCallback(async (courseId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getCourse(courseId);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải thông tin khóa học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get related courses
    const getRelatedCourses = useCallback(async (courseId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getRelatedCourses(courseId);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải khóa học liên quan');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Get course statistics
    const getCourseStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getCourseStats();
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải thống kê khóa học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get course schedule
    const getCourseSchedule = useCallback(async (courseId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getCourseSchedule(courseId);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tải lịch học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create course
    const createCourse = useCallback(async (courseData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.createCourse(courseData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi tạo khóa học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update course
    const updateCourse = useCallback(async (courseId, courseData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.updateCourse(courseId, courseData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi cập nhật khóa học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete course
    const deleteCourse = useCallback(async (courseId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.deleteCourse(courseId);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi xóa khóa học');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        courses,
        loading,
        error,
        pagination,
        fetchCourses,
        fetchFeaturedCourses,
        searchCourses,
        getCourse,
        getRelatedCourses,
        getCourseStats,
        getCourseSchedule,
        createCourse,
        updateCourse,
        deleteCourse
    };
}; 