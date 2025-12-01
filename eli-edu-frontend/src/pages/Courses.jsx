import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Badge,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// Components
import CourseCard from '../components/CourseCard/CourseCard';
import CourseFilter from '../components/CourseFilter/CourseFilter';
import CourseList from '../components/CourseList/CourseList';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedModal from '../components/AnimatedModal';
import CourseProgress from '../components/CourseProgress/CourseProgress';

const MotionBox = motion(Box);

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function Courses() {
  const [filterState, setFilterState] = useState({
    category: '',
    level: '',
    price: '',
    rating: '',
    duration: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [compareCourses, setCompareCourses] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState(null);
  const [enrollmentStep, setEnrollmentStep] = useState(1);

  const courses = [
    {
      id: '60d5ecb73e1e9c0015b0f7b1',
      title: 'English Language Fundamentals',
      category: 'language',
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

  const categories = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'language', label: 'Ngôn ngữ' },
    { value: 'business', label: 'Kinh doanh' },
    { value: 'academic', label: 'Học thuật' },
    { value: 'exam', label: 'Luyện thi' },
  ];

  const durations = [
    { value: '', label: 'Mọi thời lượng' },
    { value: '8', label: '8 tuần' },
    { value: '10', label: '10 tuần' },
    { value: '12', label: '12 tuần' },
    { value: '14', label: '14 tuần' },
    { value: '16', label: '16 tuần' },
  ];

  const levels = [
    { value: '', label: 'Mọi trình độ' },
    { value: 'Beginner', label: 'Cơ bản' },
    { value: 'Intermediate', label: 'Trung cấp' },
    { value: 'Advanced', label: 'Nâng cao' },
  ];

  const courseFeatures = {
    'English Language Fundamentals': [
      { icon: <GroupIcon />, text: 'Lớp học quy mô nhỏ (tối đa 12 học viên)' },
      { icon: <TimelineIcon />, text: 'Hệ thống theo dõi tiến độ' },
      { icon: <AssignmentIcon />, text: 'Bài tập hàng tuần và phản hồi' },
      { icon: <EmojiEventsIcon />, text: 'Chứng chỉ hoàn thành khóa học' },
    ],
    // Add features for other courses...
  };

  const handleFilterChange = (newFilters) => {
    setFilterState(newFilters);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setShowScheduleModal(false);
    setShowEnrollmentModal(false);
    setEnrollmentStep(1);
  };

  const handleCompareToggle = (course) => {
    setCompareCourses(prev => {
      if (prev.find(c => c.id === course.id)) {
        return prev.filter(c => c.id !== course.id);
      } else if (prev.length < 3) {
        return [...prev, course];
      } else {
        // Optionally show a notification that only up to 3 courses can be compared
        return prev;
      }
    });
  };

  const handleShowComparison = () => {
    setShowComparison(true);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
  };

  const handleScheduleClick = (course) => {
    setSelectedCourse(course);
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourseForEnrollment(course);
    setShowEnrollmentModal(true);
  };

  const handleCloseEnrollmentModal = () => {
    setShowEnrollmentModal(false);
    setEnrollmentStep(1);
  };

  const handleNextStep = () => {
    setEnrollmentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setEnrollmentStep(prev => prev - 1);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filterState.category === '' || course.category === filterState.category;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    const matchesDuration = filterState.duration === '' || course.duration === `${filterState.duration} weeks`;
    const matchesLevel = filterState.level === '' || course.level === filterState.level;

    return matchesCategory && matchesSearch && matchesPrice && matchesDuration && matchesLevel;
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Box>
        {/* Header Section */}
        <Box
          sx={(theme) => ({
            bgcolor: 'primary.main',
            color: 'white',
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          })}
        >
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                Khám Phá Các Khóa Học Của Chúng Tôi
              </Typography>
              <Typography variant="h5" align="center" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
                Chọn từ hơn 25 khóa học chất lượng cao được thiết kế để giúp bạn đạt được mục tiêu học tập.
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Course List and Filters */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Filters Sidebar */}
            <Grid item xs={12} md={3}>
              <CourseFilter
                filters={filterState}
                onFilterChange={handleFilterChange}
              />
            </Grid>

            {/* Course List and Search */}
            <Grid item xs={12} md={9}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Search Bar */}
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Tìm kiếm khóa học..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Course List */}
                <CourseList
                  courses={filteredCourses}
                  onCourseClick={handleOpenModal}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        {/* Course Comparison Modal */}
        <AnimatedModal
          open={showComparison}
          onClose={handleCloseComparison}
          title="So sánh khóa học"
        >
          <Grid container spacing={2}>
            {compareCourses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </AnimatedModal>

        {/* Course Schedule Modal */}
        <AnimatedModal
          open={showScheduleModal}
          onClose={handleCloseScheduleModal}
          title="Lịch học khóa học"
        >
          {selectedSchedule && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedSchedule.title}
              </Typography>
              <List>
                {selectedSchedule.schedule.map((session, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ScheduleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={session.day}
                      secondary={session.time}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                * Tất cả thời gian theo múi giờ địa phương
              </Typography>
            </>
          )}
        </AnimatedModal>

        {/* Course Enrollment Modal */}
        <AnimatedModal
          open={showEnrollmentModal}
          onClose={handleCloseEnrollmentModal}
          title="Đăng ký khóa học"
        >
          {selectedCourseForEnrollment && (
            <>
              {enrollmentStep === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Tổng quan khóa học
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={selectedCourseForEnrollment.image}
                        alt={selectedCourseForEnrollment.title}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <List>
                        {courseFeatures[selectedCourseForEnrollment.title]?.map((feature, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>{feature.icon}</ListItemIcon>
                            <ListItemText primary={feature.text} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {enrollmentStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Thông tin học viên
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Họ và tên"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Điện thoại"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày sinh"
                        type="date"
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              {enrollmentStep === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Thông tin thanh toán
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Số thẻ"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày hết hạn"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon color="primary" />
                        <Typography variant="body2" color="text.secondary">
                          Thông tin thanh toán của bạn được bảo mật và mã hóa
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}
        </AnimatedModal>
      </Box>
    </motion.div>
  );
}

export default Courses; 