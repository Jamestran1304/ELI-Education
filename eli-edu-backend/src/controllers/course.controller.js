const Course = require('../models/course.model');

// Get all courses with pagination and filters
exports.getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { category, level, search, language, sort } = req.query;
    let query = { isPublished: true };

    // Apply filters if provided
    if (category) query.category = category;
    if (level) query.level = level;
    if (language) query.language = language;
    if (search) {
      query.$text = { $search: search };
    }

    // Get total count for pagination
    const total = await Course.countDocuments(query);

    // Determine sort order
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'popular') sortOption = { currentStudents: -1 };

    // Get courses with pagination
    const courses = await Course.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải khóa học',
      error: error.message
    });
  }
};

// Get featured courses
exports.getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .sort({ currentStudents: -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải khóa học nổi bật',
      error: error.message
    });
  }
};

// Get single course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải thông tin khóa học',
      error: error.message
    });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      currentStudents: 0,
      language: 'Tiếng Việt'
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo khóa học',
      error: error.message
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật khóa học thành công',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật khóa học',
      error: error.message
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    res.json({
      success: true,
      message: 'Xóa khóa học thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa khóa học',
      error: error.message
    });
  }
};

// Get course categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải danh mục khóa học',
      error: error.message
    });
  }
};

// Get course levels
exports.getLevels = async (req, res) => {
  try {
    const levels = await Course.distinct('level');
    res.json({
      success: true,
      data: levels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải cấp độ khóa học',
      error: error.message
    });
  }
};

// Get courses by teacher
exports.getCoursesByTeacher = async (req, res) => {
  try {
    const courses = await Course.find({
      'teacher.name': req.params.teacherName,
      isPublished: true
    });
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải khóa học của giáo viên',
      error: error.message
    });
  }
};

// Get related courses
exports.getRelatedCourses = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    const relatedCourses = await Course.find({
      _id: { $ne: course._id },
      category: course.category,
      isPublished: true
    })
    .limit(4)
    .select('title thumbnail price level duration');

    res.json({
      success: true,
      data: relatedCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải khóa học liên quan',
      error: error.message
    });
  }
};

// Get course statistics
exports.getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          totalCourses: { $sum: 1 },
          totalStudents: { $sum: '$currentStudents' },
          averagePrice: { $avg: '$price' }
        }
      }
    ]);

    const levelStats = await Course.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        categoryStats: stats,
        levelStats: levelStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải thống kê khóa học',
      error: error.message
    });
  }
};

// Search courses with advanced filters
exports.searchCourses = async (req, res) => {
  try {
    const {
      query,
      minPrice,
      maxPrice,
      duration,
      level,
      category,
      sortBy = 'relevance'
    } = req.query;

    let searchQuery = { isPublished: true };

    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Price range
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }

    // Duration
    if (duration) {
      searchQuery.duration = Number(duration);
    }

    // Level
    if (level) {
      searchQuery.level = level;
    }

    // Category
    if (category) {
      searchQuery.category = category;
    }

    // Sort options
    let sortOption = {};
    switch (sortBy) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { currentStudents: -1 };
        break;
      default:
        sortOption = { score: { $meta: 'textScore' } };
    }

    const courses = await Course.find(searchQuery)
      .sort(sortOption)
      .limit(20);

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm khóa học',
      error: error.message
    });
  }
};

// Get course schedule
exports.getCourseSchedule = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .select('schedule startDate endDate');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    res.json({
      success: true,
      data: {
        schedule: course.schedule,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải lịch học',
      error: error.message
    });
  }
}; 