import { Box, Container, Grid, Typography, TextField, Button, IconButton, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';

const MotionBox = motion(Box);

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Here you would typically make an API call to subscribe the user
      setSnackbar({
        open: true,
        message: 'Cảm ơn bạn đã đăng ký nhận bản tin từ chúng tôi!',
      });
      setEmail('');
    } else {
      setSnackbar({
        open: true,
        message: 'Vui lòng nhập địa chỉ email hợp lệ.',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleNavigation = (path) => {
    navigate(path.toLowerCase().replace(' ', '-'));
  };

  const handleSocialMedia = (platform) => {
    const socialLinks = {
      facebook: 'https://facebook.com/eliedu',
      twitter: 'https://twitter.com/eliedu',
      instagram: 'https://instagram.com/eliedu',
      linkedin: 'https://linkedin.com/company/eliedu',
    };
    window.open(socialLinks[platform], '_blank');
  };

  const quickLinks = [
    { text: 'Về Chúng Tôi', path: '/about' },
    { text: 'Khóa Học', path: '/courses' },
    { text: 'Giảng Viên', path: '/about#teachers' },
    { text: 'Sự Kiện', path: '/events' },
    { text: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" gutterBottom>
                ELI EDU
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Trao quyền cho học viên với nền giáo dục chất lượng và trải nghiệm học tập cá nhân hóa.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton 
                  color="inherit" 
                  aria-label="Facebook"
                  onClick={() => handleSocialMedia('facebook')}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  aria-label="Twitter"
                  onClick={() => handleSocialMedia('twitter')}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  aria-label="Instagram"
                  onClick={() => handleSocialMedia('instagram')}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  aria-label="LinkedIn"
                  onClick={() => handleSocialMedia('linkedin')}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </MotionBox>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom>
                Liên Kết Nhanh
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                {quickLinks.map((link) => (
                  <Box
                    component="li"
                    key={link.text}
                    onClick={() => handleNavigation(link.path)}
                    sx={{
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': { color: 'secondary.main' },
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.text}
                  </Box>
                ))}
              </Box>
            </MotionBox>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" gutterBottom>
                Bản Tin
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Đăng ký nhận bản tin để cập nhật thông tin và ưu đãi đặc biệt.
              </Typography>
              <Box component="form" onSubmit={handleSubscribe}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Đăng Ký
                </Button>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} ELI EDU.
          </Typography>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
}

export default Footer; 