import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import getTheme, { getTheme as getThemeFn } from './theme';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import CourseDetails from './pages/CourseDetails';
import NotFound from './pages/NotFound';

// Components
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProviderCustom, useThemeMode } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { mode } = useThemeMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={getThemeFn(mode)}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Layout>
              <AnimatedRoutes />
              <ScrollToTop />
            </Layout>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  );
}

export default App;
