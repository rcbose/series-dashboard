import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Button, Box, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import './App.css'
import DashboardLayout from './components/DashboardLayout'
import CreateDashboard from './components/CreateDashboard'
import WidgetSearchPopup from './components/WidgetSearchPopup'
import Dashboard from './components/Dashboard'

function App() {
  const [dashboardName, setDashboardName] = useState('My Dashboard')
  const [isWidgetPopupOpen, setIsWidgetPopupOpen] = useState(false)
  const [dashboardId, setDashboardId] = useState('dashboard-1')
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
    // In a real application, this would make an API call to add the widget to the dashboard
    // For now, we're just logging it and closing the popup
    // The actual widget addition would be handled by the Dashboard component
    // which would fetch the updated dashboard definition from the API
    setIsWidgetPopupOpen(false)

    // To simulate a refresh of the dashboard after adding a widget,
    // we can change the dashboardId which will trigger a re-fetch
    // In a real app, this would be handled by the API
    setDashboardId(`dashboard-1-${Date.now()}`)
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
            <Dashboard
              dashboardId={dashboardId}
              onLayoutChange={(layout) => console.log('Layout changed:', layout)}
            />
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
