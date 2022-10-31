import React, { useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';

export default function Checkout() {
  const [allProducts, setAllProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0.00);
  // const [allSellers, setAllSellers] = useState([]);

  const calculateTotal = () => {
    const total = allProducts.reduce((acc, crr) => acc + crr.total, 0);
    setOrderTotal(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  });

  useEffect(() => {
    const getItems = localStorage.getItem('items');
    const orderItems = JSON.parse(getItems);
    setAllProducts(orderItems || []);
  }, []);

  useEffect(() => {
    // fazer requisição com axios 3001/sellers
  });

  return (
    <div>
      <NavBar />
      <div>
        <h2>Finish Order</h2>
        <CheckoutTable items={ allProducts } />
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${orderTotal}` }
        </p>
      </div>
    </div>
  );
}
