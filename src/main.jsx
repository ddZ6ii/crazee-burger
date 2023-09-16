import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import UserContextProvider from './contexts/UserContextProvider.jsx';
import AdminPanelContextProvider from './contexts/AdminPanelContextProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <AdminPanelContextProvider>
          <App />
          <ToastContainer />
        </AdminPanelContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
