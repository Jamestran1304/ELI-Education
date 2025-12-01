import React, { useState, useEffect } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../contexts/ThemeContext';
import Footer from './Footer';

const MotionBox = motion(Box);

const Layout = ({ children }) => {
    const { mode, toggleTheme } = useThemeMode();
    const [showChat, setShowChat] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        {
            sender: 'support',
            message: 'Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?',
            timestamp: new Date(),
        },
    ]);
    const [showChatButton, setShowChatButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 200; // Show button when 200px from bottom
            if (window.scrollY > scrollThreshold) {
                setShowChatButton(true);
            } else {
                setShowChatButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        ELI Education
                    </Typography>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/courses"
                        sx={{ mx: 1 }}
                    >
                        Khóa học
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/about"
                        sx={{ mx: 1 }}
                    >
                        Về chúng tôi
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/contact"
                        sx={{ mx: 1 }}
                    >
                        Liên hệ
                    </Button>
                    <Tooltip title={mode === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}>
                        <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
                            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth={false} disableGutters sx={{ flex: 1, p: 0 }}>
                {children}
            </Container>

            <Footer />

            {/* Live Chat Button */}
            <AnimatePresence>
                {showChatButton && (
                    <MotionBox
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                            position: 'fixed',
                            bottom: 80, // Adjust bottom to be above ScrollToTop button
                            right: 24,
                            zIndex: 1000,
                        }}
                    >
                        <Tooltip title="Mở Chat Trực Tuyến">
                            <IconButton
                                color="primary"
                                sx={{
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'secondary.dark' },
                                    width: 60,
                                    height: 60,
                                }}
                                onClick={() => setShowChat(true)}
                            >
                                <ChatIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </MotionBox>
                )}
            </AnimatePresence>

            {/* Chat Dialog */}
            <Dialog open={showChat} onClose={() => setShowChat(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Chat Hỗ Trợ Trực Tuyến
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowChat(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 400 }}>
                    {
                        chatMessages.map((msg, index) => (
                            <Box key={index} sx={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                                <Paper variant="outlined" sx={{
                                    p: 1.5,
                                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200',
                                    color: msg.sender === 'user' ? 'white' : 'black',
                                    borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                                    maxWidth: '70%',
                                    wordBreak: 'break-word'
                                }}>
                                    <Typography variant="body2">{msg.message}</Typography>
                                    <Typography variant="caption" display="block" textAlign={msg.sender === 'user' ? 'right' : 'left'} sx={{ mt: 0.5, color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'grey.600' }}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))
                    }
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Nhập tin nhắn..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendChatMessage(e);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="primary" onClick={handleSendChatMessage}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default Layout; 