import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../AnimatedButton';
import './CourseCard.scss';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }
};

const CourseCard = ({ course }) => {
    const {
        id,
        title,
        description,
        thumbnail,
        instructor,
        rating,
        totalStudents,
        price,
        duration,
        level,
        category
    } = course;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <Link to={`/courses/${id}`} className="course-card">
                <div className="course-card__image">
                    <img src={thumbnail} alt={title} />
                    <div className="course-card__level">{level}</div>
                </div>
                <div className="course-card__content">
                    <h3 className="course-card__title">{title}</h3>
                    <p className="course-card__description">{description}</p>
                    <div className="course-card__instructor">
                        <img src={instructor.avatar} alt={instructor.name} />
                        <span>{instructor.name}</span>
                    </div>
                    <div className="course-card__footer">
                        <div className="course-card__rating">
                            <span className="rating">{rating}</span>
                            <span className="students">({totalStudents} học viên)</span>
                        </div>
                        <div className="course-card__price">
                            {price.toLocaleString('vi-VN')} VNĐ
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CourseCard; 