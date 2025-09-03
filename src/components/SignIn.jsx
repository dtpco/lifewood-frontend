import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Link,
    Divider,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Close } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Sign in data:', formData);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'url("/dreamina-2025-09-02-2285-modern,technology, data, future of AI, g....jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }
            }}
        >
            {/* Back Button - Top Right */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 80,
                    right: 20,
                    zIndex: 3
                }}
            >
                <Button
                    onClick={handleBackClick}
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: 'success.main',
                        '&:hover': {
                            backgroundColor: 'success.dark'
                        },
                        borderRadius: 2,
                        px: 0.5,
                        py: 0.5,
                        minWidth: 'auto',
                        textTransform: 'none',
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Close />
                </Button>
            </Box>

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                <Paper
                    elevation={10}
                    sx={{
                        p: 6,
                        borderRadius: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                mb: 2
                            }}
                        >
                            Welcome Back
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: '1.1rem' }}
                        >
                            Sign in to unlock AI's true potential
                        </Typography>
                    </Box>

                    {/* Sign In Form */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            required
                            name="email"
                            type="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mb: 3,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                                boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)',
                                }
                            }}
                        >
                            Sign In
                        </Button>

                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Link
                                component={RouterLink}
                                to="/forgot-password"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Don't have an account?
                            </Typography>
                            <Link
                                component={RouterLink}
                                to="/signup"
                                sx={{
                                    color: 'secondary.main',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Create Account
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
