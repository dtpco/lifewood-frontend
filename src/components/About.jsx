// src/pages/AboutUsPage.jsx
import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

function About() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" component="h1" gutterBottom align="center" color="text.primary">
                    About Lifewood
                </Typography>
                <Typography variant="h5" paragraph align="center" color="text.secondary">
                    Discover our story, values, and what makes Lifewood a leader in AI data solutions.
                </Typography>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom color="text.primary">
                            What makes Lifewood, Lifewood?
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            Lifewood is more than just a company that processes data, delivers at speed, and
                            produces projects in multiple languages for some of the world's largest organizations.
                            While these capabilities are essential, they do not fully capture the essence of who we are.
                            At our core, we must define and communicate our identity—both internally to our global teams
                            and externally to our clients, investors, stakeholders, and friends spread across the world.
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            The communications team began this journey by revisiting the Lifewood Strategic Positioning
                            document presented in Malaysia in November 2023. This document outlines important themes and
                            ideas that encapsulate Lifewood's approach to business, highlighting the role we play in Malaysia,
                            Singapore, mainland China, and across South-East Asia and the world. It emphasizes Lifewood as
                            a bridge between ASEAN and China, and by extension, the rest of the world.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom color="text.primary">
                            Our Global Impact and ESG Commitment
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            With our headquarters in Malaysia, Lifewood is ideally situated to support the country's
                            role as a super-bridge connecting China with other nations, especially during these times
                            of tension between East and West. Our vast data resources have the potential to analyze
                            social and environmental challenges not only in Malaysia but also in Singapore and beyond,
                            contributing to social progress and development.
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            Moreover, Lifewood places a strong emphasis on ESG (Environmental, Social, and Governance)
                            principles, which are evident in our HR policies. In countries like Bangladesh, our Pottya team
                            has taken significant steps to employ a high percentage of women and people with disabilities,
                            particularly in an environment where these groups are often underrepresented.
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            At this critical juncture of innovation and expansion, we have a unique opportunity to define
                            and communicate Lifewood's potential. By doing so, we can develop an effective and creative
                            communications strategy that not only highlights our capabilities but also showcases our
                            commitment to fostering positive change across the regions we serve.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 8, bgcolor: 'primary.main', color: 'white', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Our Tone of Voice
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    {['ADAPTABLE', 'INNOVATIVE', 'TECHNOLOGICAL', 'PROACTIVE'].map((item) => (
                        <Grid item key={item} xs={12} sm={6} md={3}>
                            <Box sx={{ bgcolor: 'secondary.main', p: 2, borderRadius: 1, textAlign: 'center', color: 'white' }}>
                                <Typography variant="h5">{item}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default About;