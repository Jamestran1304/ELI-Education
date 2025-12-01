import React, { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
    const [mode, setMode] = useState('light');
    const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    const value = useMemo(() => ({ mode, toggleTheme }), [mode]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = () => useContext(ThemeContext); 