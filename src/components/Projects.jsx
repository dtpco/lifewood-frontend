import React, { useRef, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { useTheme } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: "ai-data-extraction",
        name: "AI Data Extraction",
        description: "Develop and implement advanced AI models for efficient and accurate data extraction from various sources, enhancing data processing capabilities.",
        image: "public/AI-Data-Extraction.jpg"
    },
    {
        id: "machine-learning-enablement",
        name: "Machine Learning Enablement",
        description: "Contribute to building and optimizing machine learning pipelines and applications, facilitating data-driven decision-making.",
        image: "/public/Machine Learning Enablement.jpg"
    },
    {
        id: "genealogy",
        name: "Genealogy",
        description: "Work on projects that leverage AI to analyze and interpret genealogical data, helping users uncover family histories and connections.",
        image: "/public/Genealogyyy.jpg"
    },
    {
        id: "natural-language-processing",
        name: "Natural Language Processing",
        description: "Engage in developing NLP solutions for text analysis, sentiment analysis, language translation, and conversational AI interfaces.",
        image: "/public/Natural-Language-Processing.jpg"
    },
    {
        id: "ai-enabled-customer-service",
        name: "AI-Enabled Customer Service",
        description: "Design and implement AI solutions to improve customer service interactions, including chatbots and automated support systems.",
        image: "/public/AI-Enabled-Customer-Services.jpg"
    },
    {
        id: "computer-vision",
        name: "Computer Vision",
        description: "Participate in developing computer vision applications for image recognition, object detection, video analysis, and other visual AI tasks.",
        image: "/public/Computer Vision.jpg"
    },
    {
        id: "autonomous-driving-technology",
        name: "Autonomous Driving Technology",
        description: "Contribute to cutting-edge projects focused on AI algorithms for autonomous vehicles, including perception and decision-making.",
        image: "/public/Autonomous-Driving-Technology.jpg"
    },
    {
        id: "coming-soon-1",
        name: "Coming Soon",
        description: "New exciting projects are in development. Stay tuned for more innovative AI solutions and opportunities.",
        image: "/public/dreamina-2025-09-02-8766-modern,technology, data, future of AI, g....jpeg"
    },
    {
        id: "coming-soon-2",
        name: "Coming Soon",
        description: "More groundbreaking projects will be announced soon. Join us to be part of the next wave of AI innovation.",
        image: "public/dreamina-2025-09-02-8766-modern,technology, data, future of AI, g....jpeg"
    },
];

function Projects() {
    const theme = useTheme();
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);


    // GSAP animation for the title and introductory text
    useEffect(() => {
        // Initial animation for the main title
        gsap.fromTo(titleRef.current,
            { y: -50, opacity: 0 },
            { duration: 1, y: 0, opacity: 1, ease: 'power3.out', delay: 0.2 }
        );

        // Animation for the description, slightly delayed
        gsap.fromTo(descriptionRef.current,
            { y: -30, opacity: 0 },
            { duration: 1, y: 0, opacity: 1, ease: 'power3.out', delay: 0.4 }
        );
    }, []);



    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                align="center"
                ref={titleRef}
                sx={{
                    mb: 2,
                    color: theme.palette.primary.main, // Use primary.main for a strong brand presence
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    // Responsive font size
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
            >
                Our Pioneering Projects
            </Typography>

            {/* Introductory Description */}
            <Typography
                variant="h6"
                align="center"
                ref={descriptionRef}
                sx={{
                    mb: { xs: 6, md: 8 },
                    color: theme.palette.text.secondary,
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                }}
            >
                At Lifewood, we cultivate innovation. Explore the exciting opportunities and groundbreaking initiatives where AI meets real-world impact. Find a project that sparks your passion.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    gap: 3,
                    maxWidth: '900px',
                    margin: '0 auto',
                    aspectRatio: '1/1',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto',
                        aspectRatio: 'auto'
                    }
                }}
            >
                {projectsData.map((project, index) => (
                    <Box
                        key={project.id}
                        sx={{
                            aspectRatio: '1/1',
                            '@media (max-width: 768px)': {
                                aspectRatio: 'auto'
                            }
                        }}
                    >
                        <ProjectCard
                            project={project.name}
                            description={project.description}
                            image={project.image}
                        />
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default Projects;