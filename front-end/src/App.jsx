import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
    </Routes>
  );
}

export default App;
