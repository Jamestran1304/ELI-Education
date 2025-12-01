import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TestimonialsCarousel from '../components/TestimonialsCarousel/TestimonialsCarousel';

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

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/courses');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleExploreFeature = (feature) => {
    switch (feature) {
      case 'Giảng Viên Chuyên Môn':
        navigate('/about#teachers');
        break;
      case 'Học Tập Tương Tác':
        navigate('/courses');
        break;
      case 'Kết Quả Đã Được Chứng Minh':
        navigate('/about#testimonials');
        break;
      default:
        break;
    }
  };

  const handleViewTestimonial = (testimonial) => {
    // Open a modal or navigate to a detailed view
    console.log('View testimonial:', testimonial);
  };

  const handleApplyNow = () => {
    navigate('/courses');
    // You can also add a query parameter to indicate it's from the Apply Now button
    // navigate('/courses?action=apply');
  };

  const handleRequestInfo = () => {
    navigate('/contact', { state: { from: 'request-info' } });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Box>
        {/* Hero Section */}
        <Box
          sx={(theme) => ({
            bgcolor: 'primary.main',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            backgroundSize: 'cover',
          })}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  textAlign: 'right',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Kiến Tạo Tương Lai Của Bạn Với ELI EDU
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 600 }}>
                  Trao quyền cho học viên với nền giáo dục chất lượng và trải nghiệm học tập cá nhân hóa
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mr: 2, minWidth: 150 }}
                  onClick={handleGetStarted}
                >
                  Bắt Đầu Ngay
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ minWidth: 150 }}
                  onClick={handleLearnMore}
                >
                  Tìm Hiểu Thêm
                </Button>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <img
                  src="/hero-image.png"
                  alt="Education"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Tại Sao Chọn ELI EDU?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <SchoolIcon sx={{ fontSize: 60 }} color="primary" />,
                title: 'Giảng Viên Chuyên Môn',
                description: 'Học tập từ những nhà giáo dục giàu kinh nghiệm, tận tâm với sự thành công của bạn',
              },
              {
                icon: <GroupsIcon sx={{ fontSize: 60 }} color="primary" />,
                title: 'Học Tập Tương Tác',
                description: 'Tham gia vào các cuộc thảo luận trong lớp học năng động và các hoạt động nhóm',
              },
              {
                icon: <EmojiEventsIcon sx={{ fontSize: 60 }} color="primary" />,
                title: 'Kết Quả Đã Được Chứng Minh',
                description: 'Tham gia cùng hàng nghìn học viên tốt nghiệp đã đạt được mục tiêu của họ',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        cursor: 'pointer',
                        boxShadow: (theme) => theme.shadows[8],
                      },
                    }}
                    onClick={() => handleExploreFeature(feature.title)}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          py: 8
        })}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
              Học Viên Nói Gì Về Chúng Tôi
            </Typography>
            <TestimonialsCarousel />
          </Container>
        </Box>

        {/* Statistics Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: '5000+', label: 'Học Viên Đã Đăng Ký' },
              { number: '98%', label: 'Tỷ Lệ Thành Công' },
              { number: '50+', label: 'Giảng Viên Chuyên Môn' },
              { number: '25+', label: 'Quốc Gia Đại Diện' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography
                    variant="h2"
                    color="primary"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography color="text.secondary">
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call to Action Section */}
        <Box
          sx={(theme) => ({
            py: 8,
            bgcolor: 'secondary.main',
            color: 'white',
            textAlign: 'center',
            background: `${theme.palette.secondary.dark || theme.palette.secondary.main} 0%, ${theme.palette.secondary.light || theme.palette.secondary.main} 100%)`,
          })}
        >
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Sẵn sàng bắt đầu hành trình học tập của bạn?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Tham gia cùng chúng tôi ngay hôm nay và mở khóa tiềm năng của bạn!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mr: 2, minWidth: 180 }}
                onClick={handleApplyNow}
              >
                Đăng Ký Ngay
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ minWidth: 180 }}
                onClick={handleRequestInfo}
              >
                Yêu Cầu Thông Tin
              </Button>
            </MotionBox>
          </Container>
        </Box>

        {/* Counter Section */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center" textAlign="center">
              {[
                { count: '5000+', label: 'Học viên hài lòng' },
                { count: '98%', label: 'Tỷ lệ hoàn thành' },
                { count: '50+', label: 'Giảng viên chuyên gia' },
                { count: '25+', label: 'Khóa học đa dạng' },
              ].map((item, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.count}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {item.label}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

      </Box>
    </motion.div>
  );
}

export default Home; 