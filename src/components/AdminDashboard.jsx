// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
} from '@mui/material';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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

function AdminDashboard() {
    const theme = useTheme();
    const [applications, setApplications] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null); // For editing, null for new
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

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            // Simulate API call
            const response = await fetch('/api/applications');
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            } else {
                setAlert({ type: 'error', message: 'Failed to fetch applications.' });
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error connecting to the server.' });
            console.error('Error fetching applications:', error);
        }
    };

    const handleOpenCreate = () => {
        setCurrentApplication(null);
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

    const handleOpenEdit = (application) => {
        setCurrentApplication(application);
        setFormData(application);
        setFormErrors({});
        setAlert({ type: '', message: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentApplication(null);
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
            return;
        }

        try {
            let response;
            if (currentApplication) {
                // Update existing application
                response = await fetch(`/api/applications/${currentApplication.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create new application
                response = await fetch('/api/applications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                setAlert({ type: 'success', message: `Application ${currentApplication ? 'updated' : 'added'} successfully!` });
                fetchApplications();
                handleCloseDialog();
            } else {
                setAlert({ type: 'error', message: `Failed to ${currentApplication ? 'update' : 'add'} application.` });
                console.error(`Failed to ${currentApplication ? 'update' : 'add'} application`);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error submitting form.' });
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                const response = await fetch(`/api/applications/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setAlert({ type: 'success', message: 'Application deleted successfully!' });
                    fetchApplications();
                } else {
                    setAlert({ type: 'error', message: 'Failed to delete application.' });
                    console.error('Failed to delete application');
                }
            } catch (error) {
                setAlert({ type: 'error', message: 'Error deleting application.' });
                console.error('Error deleting application:', error);
            }
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center" color="text.primary">
                    Admin Dashboard
                </Typography>
                <Typography variant="h5" paragraph align="center" color="text.secondary">
                    Manage all submitted applications efficiently.
                </Typography>

                {alert.message && (
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        {alert.message}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleOpenCreate}
                        sx={{ color: 'white' }}
                    >
                        Add New Application
                    </Button>
                </Box>

                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: theme.palette.primary.main }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Degree</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Experience</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Project</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((app) => (
                                    <TableRow
                                        key={app.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {app.firstName}
                                        </TableCell>
                                        <TableCell>{app.lastName}</TableCell>
                                        <TableCell>{app.age}</TableCell>
                                        <TableCell>{app.degree}</TableCell>
                                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {app.relevantExperience}
                                        </TableCell>
                                        <TableCell>{app.email}</TableCell>
                                        <TableCell>{app.projectAppliedFor}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => handleOpenEdit(app)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(app.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                        {currentApplication ? 'Edit Application' : 'Add New Application'}
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
                            {currentApplication ? 'Update Application' : 'Add Application'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default AdminDashboard;