'use client'
import theme from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import React, { ReactNode } from 'react'; // Import ReactNode type

interface ThemeWrapperProps {
    children: ReactNode; // Define the type of the children prop
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeWrapper;