# Dashboard Layout Implementation

This update adds a Material UI Drawer component with menu items for Dashboard, Discover, Admin, Alerts, and Notifications.

## Installation

Before using the new Dashboard Layout, you need to install the required Material UI packages:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Or if you're using yarn:

```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Implementation Details

The implementation includes:

1. A new `DashboardLayout` component in `src/components/DashboardLayout.tsx`
2. Integration with the existing App component in `src/App.tsx`

### Features

- Responsive drawer that can be toggled open/closed
- App bar with a menu button
- Menu items with appropriate icons:
  - Dashboard
  - Discover
  - Admin
  - Alerts
  - Notifications
- Main content area where children components are rendered

### Usage

To use the Dashboard Layout in other components:

```jsx
import DashboardLayout from './components/DashboardLayout';

function YourComponent() {
  return (
    <DashboardLayout>
      {/* Your content here */}
    </DashboardLayout>
  );
}
```

## Customization

You can customize the drawer width by modifying the `drawerWidth` constant in the `DashboardLayout.tsx` file.

To add or modify menu items, update the `menuItems` array in the `DashboardLayout.tsx` file.
