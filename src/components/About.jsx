// src/pages/AboutUsPage.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Divider } from '@mui/material';
import { gsap } from 'gsap';

function About() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <img src={"/public/lifewood-logo.png"} style={{ display: 'block', margin: '0 auto', width: '150px', height: 'auto' }}/>
                </Box>
                <Typography variant="h4" component="h1" gutterBottom align="center"  color="text.primary">
                    Bridging Cultures, Powering Innovation
                </Typography>


                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" paragraph align="center" color="text.secondary">
                            ABOUT US
                        </Typography>
                        <Typography variant="h2" gutterBottom color="text.primary" textAlign={"center"}>
                            Global Impact through AI
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary">
                            At Lifewood, we're more than just an AI data solutions provider; we're a vital link connecting businesses and communities globally. From our Malaysian headquarters, we specialise in high-speed, multilingual data solutions, serving some of the world's largest organisations. We are driven by innovation and a commitment to positive global impact.
                        </Typography>

                        {/* Banner Section with Three Cards */}
                        <Box sx={{
                            mt: 6,
                            bgcolor: '#f5eedb',
                            p: 5,
                            borderRadius: 2,
                            boxShadow: 3
                        }}>
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        bgcolor: '#f5eedb',
                                        width: '280px',
                                        height: '280px',
                                        boxShadow: '8px 8px 16px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.5)',
                                        borderRadius: 3,
                                        border: '2px solid rgba(0,0,0,0.1)',
                                        transform: 'perspective(500px) rotateX(5deg) rotateY(-5deg)',
                                        transition: 'transform 0.3s ease',
                                        margin: '0 auto',
                                        '&:hover': {
                                            transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.05)',
                                        }
                                    }}>
                                        <CardContent sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
                                                Connecting Continents
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                                Strategically positioned in Malaysia, we act as a crucial bridge between ASEAN and China, facilitating seamless data flow and business connections across diverse markets.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        bgcolor: '#f5eedb',
                                        width: '280px',
                                        height: '280px',
                                        boxShadow: '8px 8px 16px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.5)',
                                        borderRadius: 3,
                                        border: '2px solid rgba(0,0,0,0.1)',
                                        transform: 'perspective(500px) rotateX(5deg)',
                                        transition: 'transform 0.3s ease',
                                        margin: '0 auto',
                                        '&:hover': {
                                            transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.05)',
                                        }
                                    }}>
                                        <CardContent sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
                                                Igniting Innovation
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                                Our visionary approach aims to be the global champion in AI data solutions, continuously developing cutting-edge technologies that solve real-world challenges.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        bgcolor: '#f5eedb',
                                        width: '280px',
                                        height: '280px',
                                        boxShadow: '8px 8px 16px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.5)',
                                        borderRadius: 3,
                                        border: '2px solid rgba(0,0,0,0.1)',
                                        transform: 'perspective(500px) rotateX(5deg) rotateY(5deg)',
                                        transition: 'transform 0.3s ease',
                                        margin: '0 auto',
                                        '&:hover': {
                                            transform: 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.05)',
                                        }
                                    }}>
                                        <CardContent sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>
                                                Fostering Sustainability
                                             </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                                We integrate sustainable practices and ESG principles into every facet of our operations, enriching lives and transforming communities worldwide.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    {/*comment*/}
                    {/* Vision Banner */}
                    <Box sx={{ mt: 8 }}>
                        <Box
                            sx={{
                                backgroundImage: 'url("/vision-image.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: 3,
                                boxShadow: 4,
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                overflow: 'hidden',
                                mb: 4,
                                position: 'relative',
                                minHeight: '300px',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(2px)',
                                }
                            }}
                        >
                            {/* Main Banner Content - 70% */}
                            <Box sx={{
                                width: { xs: '100%', md: '70%' },
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                <Typography
                                    variant="h3"
                                    paragraph
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                                        fontSize: { xs: '2rem', md: '3rem' }
                                    }}
                                >
                                    Our Vision for the Future
                                </Typography>
                            </Box>

                            {/* Partition Line */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    bgcolor: 'rgba(255,255,255,0.6)',
                                    width: '2px',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />
                            <Divider
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    bgcolor: 'rgba(255,255,255,0.6)',
                                    height: '2px',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            />

                            {/* Right Vision Description - 30% */}
                            <Box sx={{
                                width: { xs: '100%', md: '30%' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                position: 'relative',
                                zIndex: 1,
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        textAlign: 'center'
                                    }}
                                >
                                    To be the leading global provider of multilingual AI solutions, connecting communities and driving innovation worldwide through sustainable and ethical practices.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {/* Mission Banner */}
                    <Box sx={{ mt: 8 }}>
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                borderRadius: 3,
                                boxShadow: 4,
                                overflow: 'hidden',
                                mb: 4,
                                position: 'relative',
                                minHeight: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 6,
                                width: '91%'
                            }}
                        >
                            <Box sx={{
                                textAlign: 'center',
                            }}>
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        mb: 3
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                        opacity: 0.9
                                    }}
                                >
                                    To bridge cultures and empower businesses through innovative AI data solutions that create positive global impact and foster meaningful connections.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                </Grid>
            </Box>



            <Box sx={{ mt: 8, bgcolor: 'primary.main', color: 'white', p: 6, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Tone of Voice
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
