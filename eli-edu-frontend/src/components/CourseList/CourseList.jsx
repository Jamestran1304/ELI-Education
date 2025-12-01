import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './CourseList.scss';

const CourseList = ({ courses, loading, error }) => {
    if (loading) {
        return (
            <div className="course-list course-list--loading">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="course-list__skeleton">
                        <div className="course-list__skeleton-image"></div>
                        <div className="course-list__skeleton-content">
                            <div className="course-list__skeleton-title"></div>
                            <div className="course-list__skeleton-description"></div>
                            <div className="course-list__skeleton-footer"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="course-list__error">
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
            </div>
        );
    }

    if (!courses.length) {
        return (
            <div className="course-list__empty">
                <i className="fas fa-book"></i>
                <p>Không tìm thấy khóa học nào</p>
            </div>
        );
    }

    return (
        <div className="course-list">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseList; 