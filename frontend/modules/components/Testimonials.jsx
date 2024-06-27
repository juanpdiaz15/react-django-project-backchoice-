import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import laravelWhite from '../../src/assets/laravel-white.svg';
import djangoWhite from '../../src/assets/django-white.svg';
import nodeWhite from '../../src/assets/node-white.svg';
import springWhite from '../../src/assets/spring-white.svg';

import laravelBlack from '../../src/assets/laravel-black.svg';
import djangoBlack from '../../src/assets/django-black.svg';
import nodeBlack from '../../src/assets/node-black.svg';
import springBlack from '../../src/assets/spring-black.svg';

const userTestimonials = [
  
  
  {
    name: 'LARAVEL',
    occupation: 'PHP',
    testimonial:
      'Laravel is an open source framework for developing web applications and services with PHP 5, PHP 7 and PHP 8. Its philosophy is to develop PHP code in an elegant and simple way, avoiding “spaghetti code”.',
  },
  {
    name: 'DJANGO',
    occupation: 'Python',
    testimonial:
      "Django is an open source web development framework, written in Python, that respects the design pattern known as model-view-controller.",
  },
  {
    name: 'NODE JS',
    occupation: 'JavaScript',
    testimonial:
      "Node.js is a cross-platform, open source, server-side runtime environment based on the JavaScript programming language, asynchronous, with data I/O in an event-driven architecture and based on Google's V8 engine.",
  },
  {
    name: 'SPRING',
    occupation: 'Java',
    testimonial:
      "Spring is an open source application development framework and inversion control container for the Java platform. ",
  },
];

const whiteLogos = [
  laravelWhite,
  djangoWhite,
  nodeWhite,
  springWhite,
];

const darkLogos = [
  laravelBlack,
  djangoBlack,
  nodeBlack,
  springBlack,
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Frameworks of Backend
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel in
          efficiency, durability, and satisfaction. Join us for quality, innovation,
          and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={5} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}