// src/components/Navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Modal, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import LifewoodLogo from '/public/lifewood-logo.png'; // Make sure you have a logo image in src/assets
import logo2 from '/public/lifewood-logo3.png'

function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleAdminClick = () => {
        setModalOpen(false);
        navigate('/signin');
    };

    const handleContactClick = () => {
        setModalOpen(false);
        // Add contact us navigation or functionality here
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={logo2} alt={LifewoodLogo} style={{ height: 40 , marginRight:10}} />

                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About Us
                    </Button>
                    <Button color="inherit" component={Link} to="/projects">
                        Projects
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/apply"
                        sx={{ ml: 2, color: 'white' }} // Ensure text color is white for visibility
                    >
                        Apply Now
                    </Button>
                </Box>

                {/* Hamburger Menu */}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleMenuClick}
                    sx={{ ml: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Modal */}
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        sx={{
                            width: 300,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 2,
                            borderRadius: 2,
                        }}
                    >
                        <List>
                            <ListItem button onClick={handleAdminClick}>
                                <ListItemText primary="Admin" />
                            </ListItem>
                            <ListItem button onClick={handleContactClick}>
                                <ListItemText primary="Contact Us" />
                            </ListItem>
                        </List>
                    </Paper>
                </Modal>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;