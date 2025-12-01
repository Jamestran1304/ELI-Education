import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 40, transition: { duration: 0.2 } }
};

const AnimatedModal = ({ open, onClose, children, ...props }) => (
    <AnimatePresence>
        {open && (
            <Dialog open={open} onClose={onClose} {...props}>
                <DialogContent sx={{ p: 0 }}>
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {children}
                    </motion.div>
                </DialogContent>
            </Dialog>
        )}
    </AnimatePresence>
);

export default AnimatedModal; 