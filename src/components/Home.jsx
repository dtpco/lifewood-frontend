// src/pages/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Home() {
    const containerRef = useRef(null);
    const bannerRef = useRef(null);
    const mapImageRef = useRef(null);
    const descriptionBoxRef = useRef(null);
    const mainContentRef = useRef(null);
    const genealogyImageRef = useRef(null);
    const genealogyDescriptionBoxRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial page load animations
            gsap.fromTo(mainContentRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );

            gsap.fromTo(bannerRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
            );

            // Set initial state for description box
            gsap.set(descriptionBoxRef.current, {
                opacity: 0,
                visibility: "hidden",
                scale: 0.8,
                x: 50
            });

            // Set initial state for genealogy description box
            gsap.set(genealogyDescriptionBoxRef.current, {
                opacity: 0,
                visibility: "hidden",
                scale: 0.8,
                x: -50
            });

            // Hover animations for map image
            const mapImage = mapImageRef.current;
            const descriptionBox = descriptionBoxRef.current;
            const genealogyImage = genealogyImageRef.current;
            const genealogyDescriptionBox = genealogyDescriptionBoxRef.current;

            const handleMouseEnter = () => {
                gsap.to(mapImage, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(descriptionBox, {
                    opacity: 1,
                    visibility: "visible",
                    scale: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(mapImage, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(descriptionBox, {
                    opacity: 0,
                    visibility: "hidden",
                    scale: 0.8,
                    x: 50,
                    duration: 0.3,
                    ease: "power2.in"
                });
            };

            // Genealogy image hover animations
            const handleGenealogyMouseEnter = () => {
                gsap.to(genealogyImage, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(genealogyDescriptionBox, {
                    opacity: 1,
                    visibility: "visible",
                    scale: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            };

            const handleGenealogyMouseLeave = () => {
                gsap.to(genealogyImage, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(genealogyDescriptionBox, {
                    opacity: 0,
                    visibility: "hidden",
                    scale: 0.8,
                    x: -50,
                    duration: 0.3,
                    ease: "power2.in"
                });
            };

            mapImage.addEventListener('mouseenter', handleMouseEnter);
            mapImage.addEventListener('mouseleave', handleMouseLeave);
            genealogyImage.addEventListener('mouseenter', handleGenealogyMouseEnter);
            genealogyImage.addEventListener('mouseleave', handleGenealogyMouseLeave);

            return () => {
                mapImage.removeEventListener('mouseenter', handleMouseEnter);
                mapImage.removeEventListener('mouseleave', handleMouseLeave);
                genealogyImage.removeEventListener('mouseenter', handleGenealogyMouseEnter);
                genealogyImage.removeEventListener('mouseleave', handleGenealogyMouseLeave);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <Container ref={containerRef} maxWidth={false} sx={{ mt: 4, textAlign: 'center', px: { xs: 2, md: 4 } }}>
            <Box
                ref={mainContentRef}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    overflow: 'hidden'
                }}
            >
                <Box sx={{
                    width: { xs: '100%', md: '70%' },
                    p: 6,
                    textAlign: 'left'
                }}>
                    <Typography variant="h2" component="h1" gutterBottom color="text.primary">
                        Welcome to Lifewood
                    </Typography>
                    <Typography variant="h5" paragraph color="text.secondary">
                        a leading data processing and project delivery company, serving some of the world's largest organizations with speed and multilingual expertise.

                        Committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.   </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        component={Link}
                        to="/apply"
                        sx={{
                            mt: 3,
                            color: 'white',
                            px: 4,
                            py: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            minWidth: 200
                        }}
                    >
                        Apply Now!
                    </Button>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                <Divider sx={{ display: { xs: 'block', md: 'none' } }} />

                <Box sx={{
                    width: { xs: '100%', md: '30%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    bgcolor: 'background.paper'
                }}>
                    <video
                        src="/0901.mp4"
                        autoPlay
                        loop
                        controls
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ mt: 8 }}>
                {/* Vision Banner */}
                <Box
                    ref={bannerRef}
                    sx={{
                        backgroundImage: 'url("/dreamina-2025-09-02-2285-modern,technology, data, future of AI, g....jpeg")',
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
                    {/* Left Image Partition - 30% */}
                    <Box sx={{
                        width: { xs: '100%', md: '30%' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        position: 'relative',
                        zIndex: 1,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(1px)'
                    }}>
                        <img
                            ref={mapImageRef}
                            src="/map.png"
                            alt="Banner Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '280px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>

                    {/* Description Box - Appears on hover */}
                    <Box
                        ref={descriptionBoxRef}
                        className="description-box"
                        sx={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            width: { xs: '100%', md: '66%' },
                            height: '80%',
                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                            p: 4,
                            borderRadius: 0,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                            zIndex: 10,
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'text.primary',
                                fontWeight: 500,
                                lineHeight: 1.6,
                                textAlign: 'center'
                            }}
                        >
                            Operates globally with offices on five continents, working in 57 languages, and employing over 35,000 staff directly and remotely.
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
                            Unlock AI's True Potential
                        </Typography>
                    </Box>
                </Box>

                {/* Genealogy Banner */}
                <Box
                    sx={{
                        backgroundImage: 'url("/geneaaaaa.jpeg")',
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
                            Genealogy
                        </Typography>
                    </Box>

                    {/* Description Box - Appears on hover */}
                    <Box
                        ref={genealogyDescriptionBoxRef}
                        className="genealogy-description-box"
                        sx={{
                            position: 'absolute',
                            left: '0',
                            top: '0',
                            width: { xs: '100%', md: '66%' },
                            height: '80%',
                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                            p: 4,
                            borderRadius: 0,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                            zIndex: 10,
                            backdropFilter: 'blur(5px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'text.primary',
                                fontWeight: 500,
                                lineHeight: 1.6,
                                textAlign: 'center'
                            }}
                        >
                            With the power of AI, Lifewood rapidly processes genealogical and historical records, illuminating family histories, national archives, and corporate data while ensuring their preservation.
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

                    {/* Right Image Partition - 30% */}
                    <Box sx={{
                        width: { xs: '100%', md: '30%' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        position: 'relative',
                        zIndex: 1,
                        bgcolor: 'white',
                        backdropFilter: 'blur(1px)'
                    }}>
                        <img
                            ref={genealogyImageRef}
                            src="/dreamina-2025-09-02-9514-genealogy, brown.jpeg"
                            alt="Genealogy Banner Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '280px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                cursor: 'pointer',
                                backgroundColor: 'white'
                            }}
                        />
                    </Box>
                </Box>

            </Box>


        </Container>
    );
}
