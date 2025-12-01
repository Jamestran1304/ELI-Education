import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, severity = 'success') => {
        setNotification({ message, severity });
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <Snackbar
                            open={!!notification}
                            autoHideDuration={6000}
                            onClose={hideNotification}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Alert
                                onClose={hideNotification}
                                severity={notification?.severity}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {notification?.message}
                            </Alert>
                        </Snackbar>
                    </motion.div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}; 