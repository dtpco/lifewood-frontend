// src/components/Navbar.jsx
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Modal,
    List,
    ListItem,
    ListItemText,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert
} from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon, Close, Add } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LifewoodLogo from '/public/lifewood-logo.png'; // Make sure you have a logo image in src/assets
import logo2 from '/public/lifewood-logo3.png'

const projects = [
    { id: 'ai-data-extraction', name: 'AI Data Extraction' },
    { id: 'machine-learning-enablement', name: 'Machine Learning Enablement' },
    { id: 'genealogy', name: 'Genealogy' },
    { id: 'natural-language-processing', name: 'Natural Language Processing' },
    { id: 'ai-enabled-customer-service', name: 'AI-Enabled Customer Service' },
    { id: 'computer-vision', name: 'Computer Vision' },
    { id: 'autonomous-driving-technology', name: 'Autonomous Driving Technology' },
    { id: 'coming-soon-1', name: 'Coming Soon' },
    { id: 'coming-soon-2', name: 'Coming Soon' },
];

function Navbar({ onApplicationAdded }) {
    const theme = useTheme();
    const [modalOpen, setModalOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        degree: '',
        relevantExperience: '',
        email: '',
        projectAppliedFor: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '' });
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleLogout = () => {
        // Add logout logic here (clear tokens, reset state, etc.)
        localStorage.removeItem('authToken'); // Example: remove auth token
        navigate('/');
    };


    const isAdminDashboard = location.pathname === '/admin';

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleOpenCreate = () => {
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            degree: '',
            relevantExperience: '',
            email: '',
            projectAppliedFor: '',
        });
        setFormErrors({});
        setAlert({ type: '', message: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            degree: '',
            relevantExperience: '',
            email: '',
            projectAppliedFor: '',
        });
        setFormErrors({});
        setAlert({ type: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
        if (!formData.age || formData.age < 18) errors.age = 'Age must be 18 or older';
        if (!formData.degree.trim()) errors.degree = 'Degree is required';
        if (!formData.relevantExperience.trim()) errors.relevantExperience = 'Relevant Experience is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid Email is required';
        if (!formData.projectAppliedFor) errors.projectAppliedFor = 'Project Applied For is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setAlert({ type: 'error', message: 'Please correct the form errors.' });
            return;
        }

        const token = getToken();
        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required. Please sign in.' });
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch('https://lifewood-backend.onrender.com/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setAlert({ type: 'success', message: 'Application added successfully!' });
                if (onApplicationAdded) {
                    onApplicationAdded();
                }
                handleCloseDialog();
            } else if (response.status === 401 || response.status === 403) {
                setAlert({ type: 'error', message: 'Unauthorized access. Please sign in again.' });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/signin');
            } else {
                const errorData = await response.json();
                setAlert({ type: 'error', message: errorData.message || 'Failed to add application.' });
                console.error('Failed to add application:', errorData);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error submitting form.' });
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo2} alt={LifewoodLogo} style={{ height: 40 , marginRight:10, cursor: 'pointer' }} />
                        </Link>
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
                        {!isAdminDashboard ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/apply"
                                sx={{ ml: 2, color: 'white' }}
                            >
                                Apply Now
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Add />}
                                onClick={handleOpenCreate}
                                sx={{ ml: 2, color: 'white' }}
                            >
                                Add New Application
                            </Button>
                        )}
                    </Box>

                    {/* Conditional Menu/Logout Button */}
                    {isAdminDashboard ? (
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleMenuClick}
                            sx={{ ml: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

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

            {/* Add New Application Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                    Add New Application
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {alert.message && (
                        <Alert severity={alert.type} sx={{ mb: 2 }}>
                            {alert.message}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={!!formErrors.firstName}
                            helperText={formErrors.firstName}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={!!formErrors.lastName}
                            helperText={formErrors.lastName}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            error={!!formErrors.age}
                            helperText={formErrors.age}
                            margin="normal"
                            variant="outlined"
                            inputProps={{ min: 0 }}
                        />
                        <TextField
                            fullWidth
                            label="Degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            error={!!formErrors.degree}
                            helperText={formErrors.degree}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Relevant Experience"
                            name="relevantExperience"
                            value={formData.relevantExperience}
                            onChange={handleChange}
                            error={!!formErrors.relevantExperience}
                            helperText={formErrors.relevantExperience}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl fullWidth margin="normal" error={!!formErrors.projectAppliedFor}>
                            <InputLabel id="project-applied-for-label">Project Applied For</InputLabel>
                            <Select
                                labelId="project-applied-for-label"
                                id="project-applied-for"
                                name="projectAppliedFor"
                                value={formData.projectAppliedFor}
                                label="Project Applied For"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Select a Project</em>
                                </MenuItem>
                                {projects.map((project) => (
                                    <MenuItem key={project.id} value={project.name}>
                                        {project.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formErrors.projectAppliedFor && (
                                <Typography color="error" variant="caption" sx={{ ml: 1.5 }}>
                                    {formErrors.projectAppliedFor}
                                </Typography>
                            )}
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
                    <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ color: 'white' }}
                    >
                        Add Application
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Navbar;