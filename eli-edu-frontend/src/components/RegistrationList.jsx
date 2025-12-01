import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import { courseApi } from '../services/api';

const RegistrationList = ({ courseId }) => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await courseApi.getRegistrations(courseId);
                setRegistrations(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load registrations');
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [courseId]);

    if (loading) {
        return (
            <CircularProgress />
        );
    }

    if (error) {
        return (
            <Alert severity="error">{error}</Alert>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Course Registrations
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Registration Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registrations.map((registration) => (
                            <TableRow key={registration.userId}>
                                <TableCell>{registration.name}</TableCell>
                                <TableCell>{registration.email}</TableCell>
                                <TableCell>
                                    {new Date(registration.registeredAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={registration.status}
                                        color={
                                            registration.status === 'active'
                                                ? 'success'
                                                : registration.status === 'completed'
                                                    ? 'primary'
                                                    : 'error'
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RegistrationList; 