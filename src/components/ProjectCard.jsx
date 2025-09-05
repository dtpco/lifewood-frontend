import React, { useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { gsap } from 'gsap';

function ProjectCard({ project, description, image }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)', scrollTrigger: { trigger: cardRef.current, start: 'top 80%' } }
        );
    }, []);

    const handleApplyClick = () => {
        // Convert project name to ID format for URL
        const projectId = project.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        // Only navigate if it's not a "Coming Soon" project
        if (project !== "Coming Soon") {
            navigate(`/apply?project=${projectId}`);
        }
    };

    return (
        <Card ref={cardRef} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden',
        }}>
            {/* Image Container with Hover Effect */}
            <Box sx={{
                position: 'relative',
                height: '60%',
                overflow: 'hidden'
            }}>
                <Box
                    component="img"
                    src={image}
                    alt={project}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                />

                {/* Description Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            opacity: 1,
                        },
                        p: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: 1.4,
                            fontSize: '0.9rem'
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{
                p: 3,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '40%'
            }}>
                <Box>
                    <Typography variant="h6" component="div" gutterBottom sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: 600,
                        textAlign: 'center'
                    }}>
                        {project}
                    </Typography>
                </Box>

                {project !== "Coming Soon" && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleApplyClick}
                        sx={{
                            mt: 'auto',
                            color: 'white',
                            fontWeight: 600,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.shadows[8],
                            },
                        }}
                    >
                        Apply Now
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default ProjectCard;