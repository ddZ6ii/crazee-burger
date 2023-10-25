import { Routes, Route } from 'react-router-dom';

import ErrorPage from './components/pages/error/ErrorPage';
import LoginPage from './components/pages/login/LoginPage';
import OrderPage from './components/pages/order/OrderPage';
import RootLayout from './components/layouts/RootLayout';

import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { ProductsProvider } from './contexts/ProductsContext';

import './App.css';

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AdminProvider>
                <RootLayout />
              </AdminProvider>
            }
          >
            <Route
              path="order"
              element={
                <ProductsProvider>
                  <OrderPage />
                </ProductsProvider>
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
