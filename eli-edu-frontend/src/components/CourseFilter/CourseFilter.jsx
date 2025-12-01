import React from 'react';
import './CourseFilter.scss';

const CourseFilter = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="course-filter">
            <div className="course-filter__group">
                <label htmlFor="category">Danh mục</label>
                <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                >
                    <option value="">Tất cả danh mục</option>
                    <option value="programming">Lập trình</option>
                    <option value="design">Thiết kế</option>
                    <option value="business">Kinh doanh</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>

            <div className="course-filter__group">
                <label htmlFor="level">Cấp độ</label>
                <select
                    id="level"
                    name="level"
                    value={filters.level}
                    onChange={handleChange}
                >
                    <option value="">Tất cả cấp độ</option>
                    <option value="beginner">Người mới bắt đầu</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                </select>
            </div>

            <div className="course-filter__group">
                <label htmlFor="price">Giá</label>
                <select
                    id="price"
                    name="price"
                    value={filters.price}
                    onChange={handleChange}
                >
                    <option value="">Tất cả giá</option>
                    <option value="free">Miễn phí</option>
                    <option value="paid">Trả phí</option>
                </select>
            </div>

            <div className="course-filter__group">
                <label htmlFor="rating">Đánh giá</label>
                <select
                    id="rating"
                    name="rating"
                    value={filters.rating}
                    onChange={handleChange}
                >
                    <option value="">Tất cả đánh giá</option>
                    <option value="4">4 sao trở lên</option>
                    <option value="3">3 sao trở lên</option>
                    <option value="2">2 sao trở lên</option>
                </select>
            </div>

            <div className="course-filter__group">
                <label htmlFor="duration">Thời lượng</label>
                <select
                    id="duration"
                    name="duration"
                    value={filters.duration}
                    onChange={handleChange}
                >
                    <option value="">Tất cả thời lượng</option>
                    <option value="0-5">Dưới 5 giờ</option>
                    <option value="5-10">5-10 giờ</option>
                    <option value="10-20">10-20 giờ</option>
                    <option value="20+">Trên 20 giờ</option>
                </select>
            </div>

            <button
                className="course-filter__reset"
                onClick={() => onFilterChange({})}
            >
                <i className="fas fa-redo"></i>
                Đặt lại
            </button>
        </div>
    );
};

export default CourseFilter; 