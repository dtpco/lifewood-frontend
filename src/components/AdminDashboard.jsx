import React, { useState, useEffect, useCallback } from 'react';
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
    Chip,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import { Edit, Delete, Close, Check } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://lifewood-backend.onrender.com';

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
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [currentApplication, setCurrentApplication] = useState(null);

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
    const [acceptingId, setAcceptingId] = useState(null);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const fetchApplications = useCallback(async () => {
        const token = getToken();
        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required. Please sign in.' });
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                let data;
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    // Non-JSON fallback
                    const text = await response.text();
                    console.error('Unexpected non-JSON response for applications:', text);
                    setAlert({ type: 'error', message: 'Unexpected response from server.' });
                    return;
                }

                const list = Array.isArray(data)
                    ? data
                    : (data.applications || data.items || data.data || []);

                // Optional: sort by createdAt desc if present
                const sorted = Array.isArray(list)
                    ? [...list].sort((a, b) => (new Date(b.createdAt || 0)) - (new Date(a.createdAt || 0)))
                    : [];

                setApplications(sorted);
            } else if (response.status === 401 || response.status === 403) {
                setAlert({ type: 'error', message: 'Unauthorized access. Please sign in again.' });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/signin');
            } else {
                setAlert({ type: 'error', message: 'Failed to fetch applications.' });
                console.error('Failed to fetch applications, status:', response.status);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error connecting to the server.' });
            console.error('Error fetching applications:', error);
        }
    }, [navigate]);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/signin');
        } else {
            fetchApplications();
        }
    }, [fetchApplications, navigate]);

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
            status: 'pending',
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
            let response;
            const payload = { ...formData }; // Create a copy to potentially modify
            if (currentApplication) {
                response = await fetch(`${API_BASE}/api/applications/${currentApplication._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create new application - ensures a status is sent
                payload.status = formData.status || 'pending'; // Ensure status is set
                response = await fetch(`${API_BASE}/api/applications`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
            }

            if (response.ok) {
                setAlert({ type: 'success', message: `Application ${currentApplication ? 'updated' : 'added'} successfully!` });
                fetchApplications();
                handleCloseDialog();
            } else if (response.status === 401 || response.status === 403) {
                setAlert({ type: 'error', message: 'Unauthorized access. Please sign in again.' });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/signin');
            } else {
                const errorData = await response.json();
                setAlert({ type: 'error', message: errorData.message || `Failed to ${currentApplication ? 'update' : 'add'} application.` });
                console.error(`Failed to ${currentApplication ? 'update' : 'add'} application:`, errorData);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error submitting form.' });
            console.error('Error submitting form:', error);

        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            return;
        }

        const token = getToken();
        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required. Please sign in.' });
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/applications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setAlert({ type: 'success', message: 'Application deleted successfully!' });
                fetchApplications();
            } else if (response.status === 401 || response.status === 403) {
                setAlert({ type: 'error', message: 'Unauthorized access. Please sign in again.' });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/signin');
            } else {
                const errorData = await response.json();
                setAlert({ type: 'error', message: errorData.message || 'Failed to delete application.' });
                console.error('Failed to delete application:', errorData);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error deleting application.' });
            console.error('Error deleting application:', error);

        }
    };

    const handleOpenAcceptModal = (application) => {
        setSelectedApplication(application);
        setOpenAcceptModal(true);
    };

    const handleCloseAcceptModal = () => {
        setOpenAcceptModal(false);
        setSelectedApplication(null);
    };

    const handleConfirmAccept = async () => {
        if (!selectedApplication) return;

        const token = getToken();
        if (!token) {
            setAlert({ type: 'error', message: 'Authentication required. Please sign in.' });
            navigate('/signin');
            handleCloseAcceptModal();
            return;
        }

        setAcceptingId(selectedApplication._id);
        try {
            const response = await fetch(`${API_BASE}/api/applications/${selectedApplication._id}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    applicantName: `${selectedApplication.firstName} ${selectedApplication.lastName}`,
                    projectName: selectedApplication.projectAppliedFor,
                    email: selectedApplication.email,
                }),
            });

            if (response.ok) {
                setAlert({ type: 'success', message: 'Acceptance email sent successfully! Application status updated!' });
                fetchApplications();
                setApplications(prevApps =>
                    prevApps.map(app =>
                        app._id === selectedApplication._id
                            ? { ...app, status: 'accepted' }
                            : app
                    )
                );
            } else if (response.status === 401 || response.status === 403) {
                setAlert({ type: 'error', message: 'Unauthorized access. Please sign in again.' });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/signin');
            } else {
                let errorMsg = 'Failed to send acceptance email.';
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || JSON.stringify(errorData) || errorMsg;
                    console.error('Failed to send acceptance email:', errorData);
                } catch (jsonErr) {
                    void jsonErr;
                    try {
                        const errorText = await response.text();
                        errorMsg = errorText || `Server error (${response.status})`;
                        console.error('Failed to send acceptance email (non-JSON):', errorText);
                    } catch (textErr) {
                        errorMsg = `Server error (${response.status}). Please check if the email service is configured correctly.`;
                        console.error('Failed to parse error response:', textErr);
                    }
                }
                setAlert({ type: 'error', message: errorMsg });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Network error. Please check your connection and try again.' });
            console.error('Network error sending acceptance email:', error);
        } finally {
            setAcceptingId(null);
            handleCloseAcceptModal();
        }
    };


    const handleAccept = async (application) => {
        handleOpenAcceptModal(application);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center" color="text.primary">
                    Admin Dashboard
                </Typography>


                {alert.message && (
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        {alert.message}
                    </Alert>
                )}

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
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((app) => (
                                    <TableRow
                                        key={app._id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': {
                                                backgroundColor: theme.palette.grey[100], // Subtle hover effect
                                            },
                                        }}
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
                                        <TableCell>
                                            <Chip
                                                label={app.status || 'pending'}
                                                color={app.status === 'accepted' ? 'success' : 'default'}
                                                size="small"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={app.status === 'accepted' ? 'Already accepted' : 'Accept Application'}>
                                                <span>
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => handleAccept(app)}
                                                        disabled={app.status === 'accepted' || acceptingId === app._id}
                                                    >
                                                        {acceptingId === app._id ? (
                                                            <CircularProgress size={20} color="inherit" />
                                                        ) : (
                                                            <Check />
                                                        )}
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                            <Tooltip title="Edit Application">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleOpenEdit(app)}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Application">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(app._id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                        Edit Application
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
                                slotProps={{ input: { min: 0 } }}
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
                                    variant="outlined"
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
                            Update Application
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Accept Confirmation Modal */}
                <Dialog
                    open={openAcceptModal}
                    onClose={acceptingId ? undefined : handleCloseAcceptModal}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{
                        bgcolor: theme.palette.success.main,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Check />
                        Confirm Application Acceptance
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseAcceptModal}
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
                    <DialogContent dividers sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom color="text.primary">
                            Are you sure you want to accept this application?
                        </Typography>
                        {selectedApplication && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.grey[100], borderRadius: 1 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Applicant:</strong> {selectedApplication.firstName} {selectedApplication.lastName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {selectedApplication.email}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Project:</strong> {selectedApplication.projectAppliedFor}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Degree:</strong> {selectedApplication.degree}
                                </Typography>
                            </Box>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            An acceptance email will be sent to the applicant confirming their acceptance for the selected project.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
                        <Button
                            onClick={handleCloseAcceptModal}
                            variant="outlined"
                            color="secondary"
                            disabled={!!acceptingId}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmAccept}
                            variant="contained"
                            color="success"
                            startIcon={acceptingId ? <CircularProgress size={18} color="inherit" /> : <Check />}
                            sx={{ color: 'white' }}
                            disabled={!!acceptingId}
                        >
                            {acceptingId ? 'Sending…' : 'Accept & Send Email'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default AdminDashboard;
