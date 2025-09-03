import React, { useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { gsap } from 'gsap';

function ProjectCard({ project, description }) {
    const theme = useTheme();
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)', scrollTrigger: { trigger: cardRef.current, start: 'top 80%' } }
        );
    }, []);

    return (
        <Card ref={cardRef} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
        }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom sx={{ color: theme.palette.primary.dark }}>
                    {project}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to={`/apply?project=${encodeURIComponent(project)}`}
                >
                    Apply Now
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProjectCard;