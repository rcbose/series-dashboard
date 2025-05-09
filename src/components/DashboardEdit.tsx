import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  BarChart as ChartIcon,
  TableChart as TableIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Dashboard as DashboardIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon
} from '@mui/icons-material';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Define widget types
interface Widget {
  id: string;
  type: string;
  title: string;
  width: number; // Grid width (1-12)
  height: number; // Height in pixels
  // Layout properties for react-grid-layout
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

// Layout item for react-grid-layout
interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
}

interface DashboardEditProps {
  onSave: (widgets: Widget[]) => void;
  onCancel: () => void;
  initialWidgets?: Widget[];
}

// Create a width-aware grid layout
const ReactGridLayout = WidthProvider(RGL);

const DashboardEdit: React.FC<DashboardEditProps> = ({
  onSave,
  onCancel,
  initialWidgets = []
}) => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [isAddWidgetDialogOpen, setIsAddWidgetDialogOpen] = useState(false);
  const [isLayoutLocked, setIsLayoutLocked] = useState(false);

  // Convert widgets to layout items for react-grid-layout
  const generateLayout = (): LayoutItem[] => {
    return widgets.map((widget, index) => {
      // Use existing layout properties if available, otherwise generate default values
      return {
        i: widget.id,
        x: widget.x !== undefined ? widget.x : (index % 2) * 6, // Alternate between left and right
        y: widget.y !== undefined ? widget.y : Math.floor(index / 2) * 4, // Stack vertically
        w: widget.w !== undefined ? widget.w : 6, // Default width (half of the container)
        h: widget.h !== undefined ? widget.h : 4, // Default height
        static: isLayoutLocked // Lock the layout when isLayoutLocked is true
      };
    });
  };

  const [layout, setLayout] = useState<LayoutItem[]>(generateLayout());

  // Regenerate layout when widgets change
  useEffect(() => {
    setLayout(generateLayout());
  }, [widgets, isLayoutLocked]);

  // Available widget types
  const widgetTypes = [
    { type: 'chart', title: 'Chart', icon: <ChartIcon /> },
    { type: 'table', title: 'Table', icon: <TableIcon /> },
    { type: 'pie', title: 'Pie Chart', icon: <PieChartIcon /> },
    { type: 'timeline', title: 'Timeline', icon: <TimelineIcon /> },
    { type: 'metrics', title: 'Metrics', icon: <DashboardIcon /> },
  ];

  const handleOpenAddWidgetDialog = () => {
    setIsAddWidgetDialogOpen(true);
  };

  const handleCloseAddWidgetDialog = () => {
    setIsAddWidgetDialogOpen(false);
  };

  // Update layout when it changes
  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout);

    // Update widgets with new layout information
    const updatedWidgets = widgets.map(widget => {
      const layoutItem = newLayout.find(item => item.i === widget.id);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return widget;
    });

    setWidgets(updatedWidgets);
  };

  // Toggle layout lock
  const handleToggleLock = () => {
    setIsLayoutLocked(!isLayoutLocked);

    // Update layout with new static property
    const updatedLayout = layout.map(item => ({
      ...item,
      static: !isLayoutLocked
    }));

    setLayout(updatedLayout);
  };

  const handleAddWidget = (type: string, title: string) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type,
      title,
      width: 6, // Default to half width
      height: 300, // Default height
      // Default layout properties
      x: 0,
      y: Infinity, // Put it at the bottom
      w: 6,
      h: 4
    };

    const updatedWidgets = [...widgets, newWidget];
    setWidgets(updatedWidgets);

    // Update layout with the new widget
    setLayout(generateLayout());

    handleCloseAddWidgetDialog();
  };

  const handleRemoveWidget = (id: string) => {
    const updatedWidgets = widgets.filter(widget => widget.id !== id);
    setWidgets(updatedWidgets);

    // Update layout after removing widget
    setLayout(layout.filter(item => item.i !== id));
  };

  const handleSaveDashboard = () => {
    // Save the current layout information with the widgets
    onSave(widgets);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" component="h2">
          Edit Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveDashboard}
            color="primary"
          >
            Save Dashboard
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddWidgetDialog}
        >
          Add Widget
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={isLayoutLocked}
              onChange={handleToggleLock}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLayoutLocked ? <LockIcon sx={{ mr: 0.5 }} /> : <LockOpenIcon sx={{ mr: 0.5 }} />}
              <Typography variant="body2">
                {isLayoutLocked ? "Layout Locked" : "Layout Unlocked"}
              </Typography>
            </Box>
          }
        />
      </Box>

      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={50}
        onLayoutChange={handleLayoutChange}
        isDraggable={!isLayoutLocked}
        isResizable={!isLayoutLocked}
        compactType="vertical"
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1
              }}>
                <Typography variant="h6">{widget.title}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveWidget(widget.id)}
                  aria-label="remove widget"
                  disabled={isLayoutLocked}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: 1
              }}>
                <Typography color="textSecondary">
                  {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Widget
                </Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </ReactGridLayout>

      {/* Add Widget Dialog */}
      <Dialog
        open={isAddWidgetDialogOpen}
        onClose={handleCloseAddWidgetDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add Widget</DialogTitle>
        <DialogContent>
          <List>
            {widgetTypes.map((widget) => (
              <ListItem
                button
                key={widget.type}
                onClick={() => handleAddWidget(widget.type, widget.title)}
              >
                <ListItemIcon>
                  {widget.icon}
                </ListItemIcon>
                <ListItemText primary={widget.title} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddWidgetDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardEdit;
