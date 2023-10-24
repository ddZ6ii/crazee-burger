import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import UserContextProvider from './providers/UserContextProvider.jsx';
import AdminContextProvider from './providers/AdminContextProvider.jsx';
import ProductsContextProvider from './providers/ProductsContextProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <AdminContextProvider>
          <ProductsContextProvider>
            <App />
            <ToastContainer />
          </ProductsContextProvider>
        </AdminContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
