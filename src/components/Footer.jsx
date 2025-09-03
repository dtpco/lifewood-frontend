// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Lifewood. All rights reserved.
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Contact us at info@lifewood.com
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;