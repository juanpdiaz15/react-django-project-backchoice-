import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Performance',
    description:
      'Efficient frameworks ensure swift responses, even under substantial load, guaranteeing user satisfaction and optimal resource allocation.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Maintainability',
    description:
      'Maintainability is a critical dimension, reflecting the ease with which a framework can accommodate modifications, enhancements, and debugging.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Popularity',
    description:
      ' A popular framework is likely to have a large, active community that can offer support, plugins, and contribute to the frameworks improvement and stability',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Ease of Development',
    description:
      'Pertains to the simplicity and expedience with which developers can understand, learn, and use the framework to create and maintain applications.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Ecosystem and Compatibility',
    description:
      'n is crucial to ensuring that the framework can effortlessly integrate with other technologies and tools, facilitating a cohesive and seamless development environment.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Security',
    description:
      'This dimension is pivotal as it directly impacts the trust users place in the application and its adherence to data protection regulations.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4">
            Features
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer support and
            precision in every detail.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}