import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const testimonials = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        role: 'Học viên Frontend',
        content: 'Khóa học rất bổ ích, giúp tôi có được nền tảng vững chắc về React và JavaScript.',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        role: 'Học viên Backend',
        content: 'Giảng viên nhiệt tình, tài liệu chi tiết và dễ hiểu. Tôi đã học được rất nhiều từ khóa học này.',
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: 3,
        name: 'Lê Văn C',
        role: 'Học viên Fullstack',
        content: 'Môi trường học tập chuyên nghiệp, hỗ trợ tốt và luôn cập nhật công nghệ mới.',
        avatar: 'https://i.pravatar.cc/150?img=3'
    }
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const theme = useTheme();

    const next = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 200 : -200,
            opacity: 0
        })
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto', my: 4 }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'tween', duration: 0.5 },
                        opacity: { duration: 0.3 }
                    }}
                >
                    <Card
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)'
                                : 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)',
                            borderRadius: 4,
                            boxShadow: 3
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Box
                                    component="img"
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].name}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        mr: 2,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                />
                                <Box>
                                    <Typography variant="h6" component="div">
                                        {testimonials[currentIndex].name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {testimonials[currentIndex].role}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                "{testimonials[currentIndex].content}"
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <IconButton
                onClick={prev}
                sx={{
                    position: 'absolute',
                    left: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
                onClick={next}
                sx={{
                    position: 'absolute',
                    right: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'action.hover' }
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default TestimonialsCarousel; 