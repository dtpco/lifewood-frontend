import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import SignIn from "./components/SignIn.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";


function App() {
    return (
        <Router>
            <Navbar />
            <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/apply" element={<ApplicationForm />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </Box>
            <Footer />
        </Router>
    );
}

export default App;
