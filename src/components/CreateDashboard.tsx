import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Save as SaveIcon } from '@mui/icons-material';

const CreateDashboard: React.FC = () => {
  const theme = useTheme();
  const [description, setDescription] = useState('');
  const [dashboardType, setDashboardType] = useState('standard');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setDashboardType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Dashboard created:', { description, dashboardType });
    // Here you would typically save the dashboard and navigate back to the dashboard list
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Create New Dashboard
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="dashboard-type-label">Dashboard Type</InputLabel>
                <Select
                  labelId="dashboard-type-label"
                  id="dashboard-type"
                  value={dashboardType}
                  label="Dashboard Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="analytics">Analytics</MenuItem>
                  <MenuItem value="monitoring">Monitoring</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  borderRadius: '4px',
                  padding: '8px 20px',
                }}
              >
                Create Dashboard
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateDashboard;
