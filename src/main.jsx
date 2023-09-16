import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import UserContextProvider from './contexts/UserContextProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <App />
        <ToastContainer />
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
