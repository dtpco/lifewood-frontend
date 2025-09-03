// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#046241', // Castleton Green
        },
        secondary: {
            main: '#FFB347', // Saffaron
        },
        background: {
            default: '#f5eedb', // Paper
            paper: '#ffffff',   // White
        },
        text: {
            primary: '#133020', // Dark Serpent
            secondary: '#046241', // Castleton Green
        },
        grey: {
            100: '#F9F7F7', // Sea Salt
        },
    },
    typography: {
        fontFamily: 'Manrope, sans-serif',
        h1: {
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 600,
        },
        h3: {
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 500,
        },
        body1: {
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
        },
        button: {
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 500,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#133020', // Castleton Green for Navbar
                },
            },
        },
    },
});