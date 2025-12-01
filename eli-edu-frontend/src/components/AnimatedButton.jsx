import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = React.forwardRef(({ children, className = '', ...props }, ref) => (
    <motion.button
        ref={ref}
        className={className}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...props}
    >
        {children}
    </motion.button>
));

export default AnimatedButton; 