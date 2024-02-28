"use client";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material";
import React, { ReactNode } from "react"; // Import ReactNode type

interface ThemeWrapperProps {
  children: ReactNode; // Define the type of the children prop
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
