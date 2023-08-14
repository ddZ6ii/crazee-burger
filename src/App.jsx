import { Routes, Route } from 'react-router-dom';

import RootLayout from './components/layouts/RootLayout';
import LoginPage from './components/pages/login/LoginPage';
import OrderPage from './components/pages/order/OrderPage';
import ErrorPage from './components/pages/error/ErrorPage';

import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}
