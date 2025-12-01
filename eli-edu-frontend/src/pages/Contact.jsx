import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  DialogActions
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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

// Add animation variants for Accordion details
const accordionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'support',
      message: 'Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date(),
    },
  ]);
  const [selectedContactType, setSelectedContactType] = useState('general');
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const faqs = [
    {
      question: 'Giờ làm việc của văn phòng bạn là khi nào?',
      answer: 'Văn phòng của chúng tôi mở cửa từ Thứ Hai đến Thứ Sáu, từ 9:00 SA đến 6:00 CH. Chúng tôi đóng cửa vào cuối tuần và các ngày lễ.',
    },
    {
      question: 'Làm cách nào để lên lịch tham quan trường?',
      answer: 'Bạn có thể lên lịch tham quan trường bằng cách điền vào biểu mẫu liên hệ trên trang này hoặc gọi điện trực tiếp đến văn phòng của chúng tôi. Các chuyến tham quan có sẵn vào các ngày trong tuần từ 10:00 SA đến 4:00 CH.',
    },
    {
      question: 'Cách tốt nhất để liên hệ với phòng tuyển sinh là gì?',
      answer: 'Cách tốt nhất để liên hệ với phòng tuyển sinh của chúng tôi là thông qua biểu mẫu liên hệ trên trang này, hoặc bạn có thể gửi email trực tiếp cho chúng tôi theo địa chỉ admissions@eliedu.com. Chúng tôi thường phản hồi trong vòng 24 giờ.',
    },
    {
      question: 'Bạn có cung cấp tư vấn trực tuyến không?',
      answer: 'Có, chúng tôi cung cấp tư vấn trực tuyến thông qua cuộc gọi video. Bạn có thể yêu cầu tư vấn trực tuyến bằng cách chọn tùy chọn trong biểu mẫu liên hệ.',
    },
  ];

  const contactTypes = [
    {
      value: 'general',
      label: 'Yêu cầu chung',
      icon: <QuestionAnswerIcon />,
      description: 'Đối với các câu hỏi chung về các khóa học và chương trình của chúng tôi',
    },
    {
      value: 'admissions',
      label: 'Tuyển sinh',
      icon: <SchoolIcon />,
      description: 'Đối với các câu hỏi về việc đăng ký và yêu cầu',
    },
    {
      value: 'support',
      label: 'Hỗ trợ kỹ thuật',
      icon: <SupportAgentIcon />,
      description: 'Đối với các vấn đề kỹ thuật với nền tảng trực tuyến của chúng tôi',
    },
    {
      value: 'consultation',
      label: 'Tư vấn trực tuyến',
      icon: <VideoCallIcon />,
      description: 'Đặt lịch tư vấn video trực tiếp 1-1',
    },
  ];

  const locations = [
    {
      city: 'New York',
      address: '123 Education Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'nyc@eliedu.com',
    },
    {
      city: 'London',
      address: '45 Learning Lane, London, UK EC1A 1BB',
      phone: '+44 20 1234 5678',
      email: 'london@eliedu.com',
    },
    {
      city: 'Singapore',
      address: '78 Knowledge Road, Singapore 238801',
      phone: '+65 6123 4567',
      email: 'singapore@eliedu.com',
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ liên hệ lại với bạn sớm!',
      severity: 'success'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: 'user',
          message: chatMessage,
          timestamp: new Date(),
        },
      ]);
      setChatMessage('');
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'support',
            message: 'Cảm ơn tin nhắn của bạn. Đội ngũ của chúng tôi sẽ phản hồi sớm.',
            timestamp: new Date(),
          }
        ]);
      }, 1000);
    }
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
        {/* Header Section */}
        <Box
          sx={(theme) => ({
            bgcolor: 'primary.main',
            color: 'white',
            py: { xs: 8, md: 12 },
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
                Liên Hệ Chúng Tôi
              </Typography>
              <Typography variant="h5" align="center" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
                Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào về các khóa học và chương trình của chúng tôi.
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Contact Type Selection */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 700, mb: 6 }}>
            Chúng tôi có thể giúp gì cho bạn?
          </Typography>
          <Grid container spacing={4}>
            {contactTypes.map((type) => (
              <Grid item xs={12} sm={6} md={3} key={type.value}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={(theme) => ({
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: 4,
                      boxShadow: 3,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                      bgcolor: selectedContactType === type.value ? 'primary.main' : theme.palette.background.paper,
                      color: selectedContactType === type.value ? 'white' : theme.palette.text.primary,
                    })}
                    onClick={() => setSelectedContactType(type.value)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box sx={{ mb: 2 }}>{type.icon}</Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {type.label}
                      </Typography>
                      <Typography variant="body2" color={selectedContactType === type.value ? 'white' : 'text.secondary'}>
                        {type.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Contact Information and Form Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper elevation={3} sx={{ height: '100%', p: 4, borderRadius: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    Liên hệ
                  </Typography>
                  <Box mt={3}>
                    {locations.map((location, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{location.city}</Typography>
                        <Box display="flex" alignItems="flex-start" mb={1}>
                          <LocationOnIcon color="primary" sx={{ mr: 1, mt: '2px' }} />
                          <Typography variant="body1" color="text.secondary">{location.address}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PhoneIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body1" color="text.secondary">{location.phone}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <EmailIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body1" color="text.secondary">{location.email}</Typography>
                        </Box>
                        {index < locations.length - 1 && <Divider sx={{ my: 3 }} />}
                      </Box>
                    ))}
                  </Box>
                  <Box mt={4}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Theo dõi chúng tôi
                    </Typography>
                    <Box>
                      <Tooltip title="Facebook"><IconButton color="primary"><FacebookIcon /></IconButton></Tooltip>
                      <Tooltip title="Twitter"><IconButton color="primary"><TwitterIcon /></IconButton></Tooltip>
                      <Tooltip title="LinkedIn"><IconButton color="primary"><LinkedInIcon /></IconButton></Tooltip>
                      <Tooltip title="Instagram"><IconButton color="primary"><InstagramIcon /></IconButton></Tooltip>
                      <Tooltip title="WhatsApp"><IconButton color="primary"><WhatsAppIcon /></IconButton></Tooltip>
                    </Box>
                  </Box>
                </Paper>
              </MotionBox>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    Gửi tin nhắn cho chúng tôi
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Họ và tên"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Chủ đề"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Tin nhắn"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          startIcon={<SendIcon />}
                          sx={{ borderRadius: 2, mt: 2 }}
                        >
                          Gửi tin nhắn
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        {/* Map Section */}
        <Box sx={(theme) => ({ py: 8, bgcolor: theme.palette.background.paper })}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
              Tìm chúng tôi trên bản đồ
            </Typography>
            <Paper
              elevation={3}
              sx={{
                height: 400,
                width: '100%',
                bgcolor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                overflow: 'hidden'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Bản đồ sẽ hiển thị tại đây
              </Typography>
            </Paper>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
            Các Câu Hỏi Thường Gặp
          </Typography>
          <Grid container spacing={3}>
            {faqs.map((faq, index) => (
              <Grid item xs={12} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Accordion
                    sx={(theme) => ({
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: 'none',
                      border: '1px solid',
                      borderColor: theme.palette.divider,
                      borderRadius: 2,
                      '&:not(:last-child)': {
                        mb: 2,
                      },
                    })}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      <AnimatePresence initial={false}>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={accordionVariants}
                          key={faq.question}
                        >
                          <Box sx={{ p: 2 }}>
                            <Typography color="text.secondary">
                              {faq.answer}
                            </Typography>
                          </Box>
                        </motion.div>
                      </AnimatePresence>
                    </AccordionDetails>
                  </Accordion>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Virtual Tour Section */}
        {/* <Box sx={(theme) => ({ py: 8, bgcolor: theme.palette.background.paper })}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
              Tham quan ảo
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" paragraph>
              Khám phá cơ sở vật chất hiện đại và môi trường học tập của chúng tôi
            </Typography>
            <Paper
              elevation={3}
              sx={{
                height: 400,
                width: '100%',
                bgcolor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 4,
                '&:hover': {
                  bgcolor: 'grey.400',
                },
              }}
              onClick={() => setShowVirtualTour(true)}
            >
              <Box sx={{ textAlign: 'center' }}>
                <VideoCallIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                <Typography variant="h6" color="white">
                  Nhấn để bắt đầu tham quan ảo
                </Typography>
              </Box>
            </Paper>
          </Container>
        </Box> */}

        {/* Snackbar for form submission feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
}

export default Contact; 