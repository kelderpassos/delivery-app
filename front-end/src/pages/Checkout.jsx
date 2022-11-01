import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';

export default function Checkout() {
  const [allProducts, setAllProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0.00);
  const [allSellers, setAllSellers] = useState([]);
  const [input, setInput] = useState({ seller: '', address: '', number: '' });

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
    axios.get('http://localhost:3001/sellers')
      .then((result) => result.data)
      .then((data) => setAllSellers(data || []))
      .catch((err) => console.log(err));
  }, []);

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  return (
    <div>
      <NavBar />
      <h3>Finish Order</h3>
      <div>
        <CheckoutTable items={ allProducts } />
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${orderTotal}` }
        </p>
      </div>
      <h3>Details and Delivery Address</h3>
      <div>
        <label htmlFor="sellers">
          Seller
          <select
            name="seller"
            id="sellers"
            onChange={ handleInput }
            data-testid="customer_checkout__select-seller"
          >
            {!input.seller.length && (
              <option>
                Chose a seller
              </option>
            )}
            {
              allSellers.map(({ name }, id) => (
                <option key={ id }>
                  { name }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="address">
          Address
          <input
            type="text"
            name="address"
            id="address"
            onChange={ handleInput }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Number
          <input
            type="number"
            name="number"
            id="number"
            onChange={ handleInput }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </div>
    </div>
  );
}
