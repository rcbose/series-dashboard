import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Button, Box, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import './App.css'
import DashboardLayout from './components/DashboardLayout'
import CreateDashboard from './components/CreateDashboard'
import WidgetSearchPopup from './components/WidgetSearchPopup'

function App() {
  const [dashboardName, setDashboardName] = useState('My Dashboard')
  const [isWidgetPopupOpen, setIsWidgetPopupOpen] = useState(false)
  const theme = useTheme()

  const handleAddWidget = () => {
    console.log('Add widget clicked')
    setIsWidgetPopupOpen(true)
  }

  const handleCloseWidgetPopup = () => {
    setIsWidgetPopupOpen(false)
  }

  const handleSelectWidget = (type: string, title: string) => {
    console.log('Selected widget:', { type, title })
    // Here you would typically add the widget to the dashboard
    setIsWidgetPopupOpen(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <DashboardLayout
            dashboardName={dashboardName}
            onDashboardNameChange={setDashboardName}
            onAddWidget={handleAddWidget}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              p: 3
            }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Dashboard Content
              </Typography>
            </Box>
          </DashboardLayout>
        } />
        <Route path="/create-dashboard" element={
          <DashboardLayout
            dashboardName="New Dashboard"
            onDashboardNameChange={setDashboardName}
            onAddWidget={handleAddWidget}
          >
            <CreateDashboard />
          </DashboardLayout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Widget Search Popup */}
      <WidgetSearchPopup
        open={isWidgetPopupOpen}
        onClose={handleCloseWidgetPopup}
        onSelectWidget={handleSelectWidget}
      />
    </Router>
  )
}

export default App
