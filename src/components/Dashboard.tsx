import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper, Typography, IconButton, Dialog, AppBar, Toolbar, Slide, TextField, ClickAwayListener } from '@mui/material';
import ReactGridLayout, { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import ReactECharts from 'echarts-for-react';
import { DragIndicator, Fullscreen, FullscreenExit, Close, Edit } from '@mui/icons-material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// Import TransitionProps from the correct location in MUI v7
import 'react-grid-layout/css/styles.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Width provider for the grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

// Transition component for fullscreen dialog
const Transition = React.forwardRef(function Transition(
  props: React.ComponentPropsWithRef<typeof Slide> & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Define widget types
export type WidgetType = 'chart' | 'pie' | 'table' | 'timeline' | 'metrics';

// Define widget interface
export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  data: any;
  layout: Layout;
}

// Define dashboard interface
export interface DashboardDefinition {
  id: string;
  name: string;
  description?: string;
  widgets: Widget[];
}

// Sample dashboard data
const sampleDashboard: DashboardDefinition = {
  id: 'dashboard-1',
  name: 'Sample Dashboard',
  description: 'A sample dashboard with various widgets',
  widgets: [
    {
      id: 'widget-1',
      type: 'chart',
      title: 'Monthly Sales',
      data: {
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 140, 160, 180, 190, 210],
            type: 'bar'
          }
        ],
        tooltip: {
          trigger: 'axis'
        }
      },
      layout: { i: 'widget-1', x: 0, y: 0, w: 6, h: 4, minW: 2, minH: 3 }
    },
    {
      id: 'widget-2',
      type: 'pie',
      title: 'Revenue by Product',
      data: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Revenue',
            type: 'pie',
            radius: '70%',
            data: [
              { value: 1048, name: 'Product A' },
              { value: 735, name: 'Product B' },
              { value: 580, name: 'Product C' },
              { value: 484, name: 'Product D' },
              { value: 300, name: 'Product E' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      layout: { i: 'widget-2', x: 6, y: 0, w: 6, h: 4, minW: 2, minH: 3 }
    },
    {
      id: 'widget-3',
      type: 'timeline',
      title: 'Website Traffic',
      data: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Page Views', 'Unique Visitors']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Page Views',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: 'Unique Visitors',
            type: 'line',
            data: [420, 532, 501, 534, 690, 730, 820]
          }
        ]
      },
      layout: { i: 'widget-3', x: 0, y: 4, w: 12, h: 4, minW: 4, minH: 3 }
    },
    {
      id: 'widget-4',
      type: 'metrics',
      title: 'Key Metrics',
      data: {
        metrics: [
          { name: 'Total Revenue', value: '$12,345', change: '+12%' },
          { name: 'Active Users', value: '1,234', change: '+5%' },
          { name: 'Conversion Rate', value: '3.45%', change: '-0.5%' }
        ]
      },
      layout: { i: 'widget-4', x: 0, y: 8, w: 4, h: 3, minW: 2, minH: 2, maxW: 12 }
    },
    {
      id: 'widget-5',
      type: 'table',
      title: 'Sales Data',
      data: {
        columns: [
          { accessorKey: 'id', header: 'ID' },
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'category', header: 'Category' },
          { accessorKey: 'price', header: 'Price' },
          { accessorKey: 'stock', header: 'Stock' },
          { accessorKey: 'status', header: 'Status' }
        ],
        data: [
          { id: 1, name: 'Product A', category: 'Electronics', price: '$299.99', stock: 25, status: 'In Stock' },
          { id: 2, name: 'Product B', category: 'Clothing', price: '$59.99', stock: 12, status: 'In Stock' },
          { id: 3, name: 'Product C', category: 'Home', price: '$149.99', stock: 8, status: 'Low Stock' },
          { id: 4, name: 'Product D', category: 'Electronics', price: '$499.99', stock: 0, status: 'Out of Stock' },
          { id: 5, name: 'Product E', category: 'Accessories', price: '$29.99', stock: 45, status: 'In Stock' },
          { id: 6, name: 'Product F', category: 'Clothing', price: '$79.99', stock: 18, status: 'In Stock' },
          { id: 7, name: 'Product G', category: 'Home', price: '$199.99', stock: 5, status: 'Low Stock' },
          { id: 8, name: 'Product H', category: 'Electronics', price: '$399.99', stock: 2, status: 'Low Stock' },
          { id: 9, name: 'Product I', category: 'Accessories', price: '$19.99', stock: 30, status: 'In Stock' },
          { id: 10, name: 'Product J', category: 'Clothing', price: '$89.99', stock: 0, status: 'Out of Stock' }
        ]
      },
      layout: { i: 'widget-5', x: 4, y: 8, w: 8, h: 5, minW: 4, minH: 4 }
    }
  ]
};

interface DashboardProps {
  dashboardId?: string;
  onLayoutChange?: (layout: Layout[]) => void;
  isEditMode?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardId, onLayoutChange, isEditMode = false }) => {
  const [dashboard, setDashboard] = useState<DashboardDefinition | null>(null);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
  const [fullscreenWidget, setFullscreenWidget] = useState<string | null>(null);
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);

  // Memoize table columns for each widget to avoid recreating them on every render
  const tableColumnsMap = useMemo(() => {
    if (!dashboard) return {};

    const columnsMap: Record<string, MRT_ColumnDef<any>[]> = {};
    dashboard.widgets.forEach(widget => {
      if (widget.type === 'table' && widget.data.columns) {
        columnsMap[widget.id] = widget.data.columns;
      }
    });
    return columnsMap;
  }, [dashboard]);

  // In a real application, this would fetch the dashboard from an API
  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchDashboard = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/dashboards/${dashboardId}`);
        // const data = await response.json();

        // For now, use the sample dashboard
        setTimeout(() => {
          setDashboard(sampleDashboard);

          // Initialize layouts for different breakpoints
          const lgLayouts = sampleDashboard.widgets.map(widget => widget.layout);

          // Create responsive layouts for different screen sizes
          const mdLayouts = lgLayouts.map(layout => ({
            ...layout,
            w: Math.max(Math.floor(layout.w * 0.8), layout.minW || 2)
          }));

          const smLayouts = lgLayouts.map(layout => ({
            ...layout,
            w: Math.max(Math.floor(layout.w * 0.6), layout.minW || 2)
          }));

          const xsLayouts = lgLayouts.map(layout => ({
            ...layout,
            w: Math.max(Math.floor(layout.w * 0.5), layout.minW || 2),
            x: 0 // Force single column on mobile
          }));

          const initialLayouts = {
            lg: lgLayouts,
            md: mdLayouts,
            sm: smLayouts,
            xs: xsLayouts
          };
          setLayouts(initialLayouts);
        }, 500);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, [dashboardId]);

  // Handle layout changes
  const handleLayoutChange = (currentLayout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
    if (onLayoutChange) {
      onLayoutChange(currentLayout);
    }
  };

  // Handle widget title edit
  const handleEditWidgetTitle = (widgetId: string) => {
    setEditingWidgetId(widgetId);
  };

  // Handle widget title change
  const handleWidgetTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dashboard || !editingWidgetId) return;

    const updatedWidgets = dashboard.widgets.map(widget => {
      if (widget.id === editingWidgetId) {
        return { ...widget, title: event.target.value };
      }
      return widget;
    });

    setDashboard({ ...dashboard, widgets: updatedWidgets });
  };

  // Handle widget title save
  const handleWidgetTitleSave = () => {
    setEditingWidgetId(null);
  };

  // Handle widget title key down
  const handleWidgetTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleWidgetTitleSave();
    }
  };

  // Render widget based on type
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'chart':
      case 'pie':
      case 'timeline':
        return (
          <ReactECharts
            option={widget.data}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        );
      case 'metrics':
        return (
          <Box sx={{ p: 2, height: '100%' }}>
            {widget.data.metrics.map((metric: any, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {metric.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={metric.change.startsWith('+') ? 'success.main' : 'error.main'}
                  >
                    {metric.change}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      case 'table':
        // Use the memoized columns from tableColumnsMap
        return (
          <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
            <MaterialReactTable
              columns={tableColumnsMap[widget.id] || widget.data.columns}
              data={widget.data.data}
              enableColumnResizing
              enablePagination={true}
              enableStickyHeader
              muiTableContainerProps={{ sx: { maxHeight: '100%' } }}
              initialState={{
                density: 'compact',
                pagination: { pageSize: 5, pageIndex: 0 }
              }}
            />
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 2, height: '100%' }}>
            <Typography>Unsupported widget type: {widget.type}</Typography>
          </Box>
        );
    }
  };

  if (!dashboard) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  // Find the fullscreen widget if one is selected
  const fullscreenWidgetData = fullscreenWidget
    ? dashboard.widgets.find(w => w.id === fullscreenWidget)
    : null;

  return (
    <Box sx={{
      width: '100%',
      p: { xs: 0, sm: 1, md: 2 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexGrow: 1,
      position: 'relative'
    }}>
      {/* Fullscreen Dialog */}
      <Dialog
        fullScreen
        open={!!fullscreenWidget}
        onClose={() => setFullscreenWidget(null)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setFullscreenWidget(null)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {fullscreenWidgetData?.title}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setFullscreenWidget(null)}
              aria-label="restore"
              title="Exit Fullscreen"
            >
              <FullscreenExit />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{
          p: 3,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
          {fullscreenWidgetData && renderWidget(fullscreenWidgetData)}
        </Box>
      </Dialog>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        draggableHandle=".drag-handle"
        margin={[12, 12]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        autoSize={true}
        compactType="vertical"
        style={{ width: '100%', position: 'relative' }}
      >
        {dashboard.widgets.map((widget) => (
          <Box key={widget.id}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  boxShadow: theme => theme.shadows[3]
                }
              }}
            >
              <Box
                className="widget-title-bar"
                sx={{
                  p: 1,
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: isEditMode ? 'grab' : 'default',
                  backgroundColor: 'transparent'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                  }}
                  className={isEditMode ? "non-draggable" : ""}
                >
                  {isEditMode && (
                    <DragIndicator
                      className="drag-handle"
                      sx={{
                        mr: 1,
                        color: 'text.secondary',
                        fontSize: '1.2rem'
                      }}
                    />
                  )}
                  {isEditMode && editingWidgetId === widget.id ? (
                    <ClickAwayListener onClickAway={handleWidgetTitleSave}>
                      <TextField
                        value={widget.title}
                        onChange={handleWidgetTitleChange}
                        onKeyDown={handleWidgetTitleKeyDown}
                        onBlur={handleWidgetTitleSave}
                        autoFocus
                        size="small"
                        fullWidth
                        sx={{
                          maxWidth: '80%',
                          '& .MuiOutlinedInput-root': {
                            fontSize: '0.875rem',
                            fontWeight: 500
                          }
                        }}
                      />
                    </ClickAwayListener>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        flexGrow: 1
                      }}
                    >
                      {widget.title}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }} className="non-draggable">
                  {isEditMode && (
                    <IconButton
                      size="small"
                      onClick={() => handleEditWidgetTitle(widget.id)}
                      sx={{
                        ml: 1,
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                      title="Edit Title"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  )}
                  {!isEditMode && (
                    <IconButton
                      size="small"
                      onClick={() => setFullscreenWidget(widget.id)}
                      sx={{
                        ml: 1,
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                      title="Enter Fullscreen"
                    >
                      <Fullscreen fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                  {renderWidget(widget)}
              </Box>
            </Paper>
          </Box>
        ))}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default Dashboard;
