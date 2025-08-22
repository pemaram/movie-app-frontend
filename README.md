# ReactJS Frontend

This project is a **React-based frontend application** with the following features:

- **Login Page** with JWT authentication
- **Movies List Page** with pagination
- **Add Movie Page** for inserting movie details

## ✅ Prerequisites

- Node.js (>= 16.x)
- npm or yarn

## 🔧 Installation & Setup

```bash
# Install all dependencies listed in package.json
npm install

# Set up environment variables
# Create a .env file in the root directory and add:
REACT_APP_API_URL="YOUR_BACKEND_API_URL_HERE"

# Start the React development server (runs on http://localhost:3000 by default)
npm start
```

## 📁 Project Structure

```
src/
  ├── components/    # Reusable UI components (buttons, modals, input fields, etc.)
  ├── pages/         # Page-level components (Login, Movies List, Add Movie)
  ├── services/      # API service calls and helper functions (Axios requests, auth)
  ├── App.js         # Root application component with routing and providers
  └── index.js       # Application entry point
```

## 🚀 Available Scripts

```bash
# Start development server with live reload
npm start

# Build optimized production-ready files
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## 🎯 Features

- ✅ **Login Form** with JWT authentication
- ✅ **Movies List** with pagination support
- ✅ **Add New Movie** form
- ✅ Responsive design
- ✅ API integration through service layer

## ⚙️ Configuration

Update the `REACT_APP_API_URL` in your `.env` file to point to your backend API endpoint. For example:

```
REACT_APP_API_URL="API_URL"
```

## 📦 Dependencies

All required dependencies are listed in `package.json`. Run `npm install` to install them before starting the development server.

## 🔐 Environment Variables

The application uses the following environment variables:

- `REACT_APP_API_URL`: Base URL for backend API requests

Make sure to set these variables in your `.env` file before running the application.