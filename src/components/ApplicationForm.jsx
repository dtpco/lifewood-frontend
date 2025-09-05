// src/pages/ApplicationFormPage.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Alert,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const projects = [
    { id: 'ai-data-extraction', name: 'AI Data Extraction' },
    { id: 'machine-learning-enablement', name: 'Machine Learning Enablement' },
    { id: 'genealogy', name: 'Genealogy' },
    { id: 'natural-language-processing', name: 'Natural Language Processing' },
    { id: 'ai-enabled-customer-service', name: 'AI-Enabled Customer Service' },
    { id: 'computer-vision', name: 'Computer Vision' },
    { id: 'autonomous-driving-technology', name: 'Autonomous Driving Technology' },
];

function ApplicationForm() {
    const location = useLocation();
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
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const projectFromUrl = queryParams.get('project');
        if (projectFromUrl) {
            const selectedProject = projects.find(p => p.id === projectFromUrl);
            if (selectedProject) {
                setFormData((prevData) => ({ ...prevData, projectAppliedFor: selectedProject.name }));
            }
        }
    }, [location]);

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
            setSubmissionStatus('error');
            return;
        }

        // Simulate API call to backend
        console.log('Form Data Submitted:', formData);
        try {
            // Replace with your actual backend API endpoint
            // Make sure your backend is running on http://localhost:5000
            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionStatus('success');
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
            } else {
                let errorMessage = 'An error occurred during submission.';

                try {
                    const errorData = await response.json();

                    // Check if it's a duplicate email error
                    if (errorData.message && errorData.message.includes('email already exists')) {
                        // For duplicate email, show success message since we want to allow multiple applications
                        setSubmissionStatus('success');
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
                        return;
                    } else {
                        errorMessage = errorData.message || 'Server error during application submission.';
                    }
                } catch (parseError) {
                    // If response is not JSON, use status-based error message
                    if (response.status === 500) {
                        errorMessage = 'Internal server error. Please try again later.';
                    } else if (response.status === 404) {
                        errorMessage = 'Service not found. Please contact support.';
                    } else {
                        errorMessage = `Server error (${response.status}). Please try again.`;
                    }
                }

                setSubmissionStatus('error');
                console.error('Submission failed:', errorMessage);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error submitting form:', error);
            // Network error or other issues
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.error('Network error: Unable to connect to server');
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center" color="text.primary">
                    Application Form
                </Typography>
                <Typography variant="h5" paragraph align="center" color="text.secondary">
                    Join the Lifewood team by applying for one of our exciting projects!
                </Typography>

                {submissionStatus === 'success' && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Application submitted successfully! You can apply for multiple projects with the same email.
                    </Alert>
                )}
                {submissionStatus === 'error' && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        There was an error submitting your application. Please check that the server is running and try again.
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 4, width: '100%', color: 'white' }}
                    >
                        Submit Application
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ApplicationForm;