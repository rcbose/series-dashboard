import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material';
import {
  BarChart as ChartIcon,
  TableChart as TableIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon
} from '@mui/icons-material';

// Define widget type interface
export interface WidgetType {
  type: string;
  title: string;
  icon: React.ReactNode;
  description?: string;
}

interface WidgetSearchPopupProps {
  open: boolean;
  onClose: () => void;
  onSelectWidget: (type: string, title: string) => void;
}

const WidgetSearchPopup: React.FC<WidgetSearchPopupProps> = ({
  open,
  onClose,
  onSelectWidget
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Available widget types
  const widgetTypes: WidgetType[] = [
    {
      type: 'chart',
      title: 'Chart',
      icon: <ChartIcon />,
      description: 'Display data in a bar chart format'
    },
    {
      type: 'table',
      title: 'Table',
      icon: <TableIcon />,
      description: 'Show data in a tabular format'
    },
    {
      type: 'pie',
      title: 'Pie Chart',
      icon: <PieChartIcon />,
      description: 'Visualize data as a pie chart'
    },
    {
      type: 'timeline',
      title: 'Timeline',
      icon: <TimelineIcon />,
      description: 'Display data over time'
    },
    {
      type: 'metrics',
      title: 'Metrics',
      icon: <DashboardIcon />,
      description: 'Show key performance indicators'
    },
  ];

  // Filter widgets based on search query
  const filteredWidgets = widgetTypes.filter(widget =>
    widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    widget.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    widget.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Clear search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Add Widget</Typography>
        </Box>
      </DialogTitle>

      <Box sx={{ px: 3, pt: 1 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ mb: 2 }}
        />
      </Box>

      <DialogContent dividers sx={{ p: 0 }}>
        {filteredWidgets.length > 0 ? (
          <List sx={{ pt: 0 }}>
            {filteredWidgets.map((widget) => (
              <ListItem
                button
                key={widget.type}
                onClick={() => onSelectWidget(widget.type, widget.title)}
                sx={{
                  '&:hover': {
                    backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon>{widget.icon}</ListItemIcon>
                <ListItemText
                  primary={widget.title}
                  secondary={widget.description}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No widgets found matching "{searchQuery}"
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetSearchPopup;
