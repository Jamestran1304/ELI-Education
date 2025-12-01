import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
      </motion.div>
      <Typography
        variant="h6"
        sx={{ mt: 2, color: 'primary.main' }}
        component={motion.div}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Loading...
      </Typography>
    </motion.div>
  );
}

export default LoadingScreen; 