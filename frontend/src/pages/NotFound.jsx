import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Importa tu archivo API
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Paper, TextField, Box, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, IconButton, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ACCESS_TOKEN } from '../constants';

const theme = createTheme();

const ProtectedPage = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isProjectDetailsComplete, setIsProjectDetailsComplete] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Fetch frameworks from the API when the component mounts
    api.get('api/framework/')
      .then(response => setFrameworks(response.data))
      .catch(error => console.error('Error fetching frameworks:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/sign-in');
  };

  const handleProjectDetailsChange = () => {
    setIsProjectDetailsComplete(projectName !== '' && projectDescription !== '');
  };

  const handleSave = () => {
    const reportData = generateReport(frameworks);
    setReport({ ...reportData, projectName, projectDescription });

    const projectData = {
      name: projectName,
      description: projectDescription,
      framework_ids: frameworks.map(fw => fw.id)
    };

    api.post('api/project/', projectData)
      .then(response => console.log('Project saved:', response.data))
      .catch(error => console.error('Error saving project:', error));
  };

  const handleFrameworkDetailsOpen = (framework) => {
    setSelectedFramework(framework);
  };

  const handleFrameworkDetailsClose = () => {
    setSelectedFramework(null);
  };

  const handleMetricValueChange = (dimensionIndex, metricIndex, value) => {
    const updatedFrameworks = [...frameworks];
    updatedFrameworks[selectedFramework.index].dimensions[dimensionIndex].metrics[metricIndex].value = parseFloat(value);
    setFrameworks(updatedFrameworks);
  };

  const calculateDimensionWeight = (dimension) => {
    const totalValue = dimension.metrics.reduce((sum, metric) => sum + metric.value, 0);
    const averageValue = totalValue / dimension.metrics.length;
    return averageValue * dimension.weight;
  };

  const generateReport = (frameworks) => {
    const metrics = frameworks[0].dimensions.map(d => d.name);
    const frameworkNames = frameworks.map(f => f.name);
    const weights = frameworks[0].dimensions.map(d => d.weight);
  
    const data = metrics.map((metricName, index) => {
      const row = {
        metric: metricName,
        weight: weights[index]
      };
      frameworks.forEach((framework, frameworkIndex) => {
        const dimension = framework.dimensions.find(d => d.name === metricName);
        row[frameworkNames[frameworkIndex]] = calculateDimensionWeight(dimension);
      });
      return row;
    });
  
    // Calcular el puntaje final para cada framework
    const finalScores = frameworkNames.map((name, frameworkIndex) => {
      // Calcular el puntaje total ponderado sumando los puntajes ponderados de cada dimensión
      const totalWeightedScore = frameworks[frameworkIndex].dimensions.reduce((sum, dimension) => {
        const dimensionWeightedScore = calculateDimensionWeight(dimension);
        return sum + dimensionWeightedScore;
      }, 0);
      return {
        name,
        score: totalWeightedScore
      };
    });
  
    // Ordenar los puntajes finales de mayor a menor
    finalScores.sort((a, b) => b.score - a.score);
  
    return {
      data,
      finalScores,
      bestFramework: finalScores[0].name
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href='/home'>
            Backend Framework Comparison
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Project Details
          </Typography>
          <TextField
            fullWidth
            label="Project Name"
            variant="outlined"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              handleProjectDetailsChange();
            }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Project Description"
            variant="outlined"
            placeholder="Enter your project description"
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
              handleProjectDetailsChange();
            }}
            sx={{ mt: 2 }}
          />
        </Paper>
        {isProjectDetailsComplete && (
          <>
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                Metrics Comparison
              </Typography>
              {frameworks.map((framework, frameworkIndex) => (
                <Box key={frameworkIndex} sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    {framework.name}
                  </Typography>
                  {framework.dimensions.map((dimension, dimensionIndex) => (
                    <Box key={dimensionIndex} sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {dimension.name} (Weighted Score: {calculateDimensionWeight(dimension)})
                      </Typography>
                      <Button variant="outlined" onClick={() => handleFrameworkDetailsOpen({ ...framework, index: frameworkIndex })}>
                        View Details
                      </Button>
                    </Box>
                  ))}
                </Box>
              ))}
            </Paper>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Project
              </Button>
            </Box>
            {report && (
              <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Report
                  </Typography>
                  <Typography variant="h6">
                    Project Name: {report.projectName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Project Description: {report.projectDescription}
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Metrics</TableCell>
                        {frameworks.map((framework, index) => (
                          <TableCell key={index}>{framework.name}</TableCell>
                        ))}
                        <TableCell>Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report.data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.metric}</TableCell>
                          {frameworks.map((framework, frameworkIndex) => (
                            <TableCell key={frameworkIndex}>{row[framework.name]}</TableCell>
                          ))}
                          <TableCell>{row.weight}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>Final Rating</TableCell>
                        {report.finalScores.map((score, index) => (
                          <TableCell key={index}>{(score.score * 100).toFixed(2)}%</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="h5" sx={{ mt: 4 }}>
                    Best Framework for the Project: {report.bestFramework}
                  </Typography>
                </Paper>
              </Box>
            )}
          </>
        )}
      </Container>
      <FrameworkDetailsDialog
        open={selectedFramework !== null}
        onClose={handleFrameworkDetailsClose}
        framework={selectedFramework}
        onMetricValueChange={handleMetricValueChange}
      />
    </ThemeProvider>
  );
};

const FrameworkDetailsDialog = ({ open, onClose, framework, onMetricValueChange }) => {
  const handleMetricValueChange = (dimensionIndex, metricIndex, value) => {
    onMetricValueChange(dimensionIndex, metricIndex, value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{framework ? framework.name : 'Framework Details'}</DialogTitle>
      <DialogContent>
        {framework && framework.dimensions.map((dimension, dimensionIndex) => (
          <div key={dimensionIndex}>
            <Typography variant="subtitle1" gutterBottom>
              {dimension.name}
            </Typography>
            <TextField
              type="number"
              label="Weight"
              value={dimension.weight}
              disabled={!dimension.editable}
              sx={{ mb: 2 }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dimension.metrics.map((metric, metricIndex) => (
                  <TableRow key={metric.id}>
                    <TableCell>
                      <Tooltip title={metric.description}>
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      {metric.name}
                    </TableCell>
                    <TableCell>
                      {metric.editable ? (
                        <TextField
                          select
                          value={metric.value}
                          onChange={(e) => handleMetricValueChange(dimensionIndex, metricIndex, e.target.value)}
                        >
                          <MenuItem value={1}>Full measure: 1</MenuItem>
                          <MenuItem value={0.5}>Partially measure: 0.5</MenuItem>
                          <MenuItem value={0}>Not measure: 0</MenuItem>
                        </TextField>
                      ) : (
                        metric.value
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProtectedPage;
