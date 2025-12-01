import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const CourseProgress = ({ progress = 0, totalLessons = 0, completedLessons = 0 }) => {
    const percentage = Math.round((completedLessons / totalLessons) * 100) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #1976d2 30%, #64b5f6 90%)',
                    color: 'white'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Tiến độ khóa học
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    backgroundColor: 'white'
                                }
                            }}
                        />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 35 }}>
                        {percentage}%
                    </Typography>
                </Box>
                <Typography variant="body2">
                    Đã hoàn thành {completedLessons} / {totalLessons} bài học
                </Typography>
            </Paper>
        </motion.div>
    );
};

export default CourseProgress; 