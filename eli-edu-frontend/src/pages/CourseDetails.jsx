import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseApi } from '../services/api';
import CourseRegistration from '../components/CourseRegistration';
import RegistrationList from '../components/RegistrationList';
import CourseProgress from '../components/CourseProgress/CourseProgress';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Box,
    Rating,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    AccessTime,
    School,
    Star,
    CheckCircle,
    Description,
    Person
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await courseApi.getById(id);
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải chi tiết khóa học');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container>
                <Alert severity="info" sx={{ mt: 4 }}>Không tìm thấy khóa học</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* Course Header */}
                <Grid item xs={12}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={course.thumbnail}
                                alt={course.title}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                                    {course.title}
                                </Typography>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Rating value={course.rating || 0} readOnly precision={0.5} size="large" />
                                    <Typography variant="body1" color="text.secondary" ml={1}>
                                        ({course.reviews?.length || 0} đánh giá)
                                    </Typography>
                                </Box>
                                <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                                    {course.price.toLocaleString('vi-VN')} VNĐ
                                </Typography>
                                <Typography variant="body1" paragraph color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </MotionBox>
                </Grid>

                {/* Course Progress */}
                <Grid item xs={12}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <CourseProgress
                            totalLessons={course.lessons?.length || 0}
                            completedLessons={course.completedLessons || 0}
                        />
                    </MotionBox>
                </Grid>

                {/* Course Details and Sidebar */}
                <Grid item xs={12} md={8}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                    Tổng quan khóa học
                                </Typography>
                                <Typography variant="body1" paragraph color="text.secondary">
                                    {course.shortDescription}
                                </Typography>

                                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
                                    Bạn sẽ học gì
                                </Typography>
                                <List>
                                    {course.features?.map((feature, index) => (
                                        <ListItem key={index} sx={{ py: 0.5 }}>
                                            <ListItemIcon>
                                                <CheckCircle color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body1">{feature}</Typography>} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
                                    Yêu cầu
                                </Typography>
                                <List>
                                    {course.requirements?.map((requirement, index) => (
                                        <ListItem key={index} sx={{ py: 0.5 }}>
                                            <ListItemIcon>
                                                <CheckCircle color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body1">{requirement}</Typography>} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </MotionBox>
                </Grid>

                <Grid item xs={12} md={4}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                                    Thông tin khóa học
                                </Typography>
                                <List>
                                    <ListItem sx={{ py: 0.5 }}>
                                        <ListItemIcon>
                                            <AccessTime />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="body1" sx={{ fontWeight: 600 }}>Thời lượng</Typography>}
                                            secondary={<Typography variant="body2" color="text.secondary">{`${course.duration} tuần`}</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 0.5 }}>
                                        <ListItemIcon>
                                            <School />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="body1" sx={{ fontWeight: 600 }}>Trình độ</Typography>}
                                            secondary={<Typography variant="body2" color="text.secondary">{course.level}</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ py: 0.5 }}>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="body1" sx={{ fontWeight: 600 }}>Giảng viên</Typography>}
                                            secondary={<Typography variant="body2" color="text.secondary">{course.teacher?.name}</Typography>}
                                        />
                                    </ListItem>
                                </List>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                                    Đặc điểm khóa học
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    <Chip
                                        icon={<Description />}
                                        label="Tài liệu khóa học"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                    />
                                    <Chip
                                        icon={<Star />}
                                        label="Chứng chỉ"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </MotionBox>
                </Grid>

                {/* Registration Section */}
                <Grid item xs={12}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <CourseRegistration courseId={id} />
                    </MotionBox>
                </Grid>

                {/* Registration List */}
                <Grid item xs={12}>
                    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                        <RegistrationList courseId={id} />
                    </MotionBox>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CourseDetails; 