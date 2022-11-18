import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styles from './CSS/Checkout.module.css';

export default function Checkout() {
  const [allProducts, setAllProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0.00);
  const [allSellers, setAllSellers] = useState([]);
  const [input, setInput] = useState(
    { sellerId: '', deliveryAddress: '', deliveryNumber: '' },
  );
  const navigate = useNavigate();

  const calculateTotal = () => {
    const total = allProducts.reduce((acc, crr) => acc + Number(crr.totalPrice), 0);
    setOrderTotal(total.toFixed(2).replace('.', ','));
  };

  const validFields = () => {
    const FIVE = 5;
    const validAddress = input.deliveryAddress.length > FIVE;
    const validNumber = input.deliveryNumber.length > 0;
    const validSeller = input.sellerId.length > 0;
    const validProducts = allProducts.length > 0;

    return validAddress && validNumber && validSeller && validProducts;
  };

  useEffect(() => {
    axios.get('http://localhost:3001/sellers')
      .then((result) => result.data)
      .then((data) => setAllSellers(data))
      .catch((err) => {
        setAllSellers([]);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const getItems = localStorage.getItem('carrinho');
    const orderItems = JSON.parse(getItems);
    setAllProducts(orderItems || []);
  }, []);

  useEffect(() => {
    calculateTotal();
  });

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, token } = JSON.parse(localStorage.getItem('user'));
    const { sellerId, deliveryAddress, deliveryNumber } = input;

    const order = {
      name,
      sellerId: Number(sellerId),
      totalPrice: Number(orderTotal.replace(',', '.')),
      deliveryAddress,
      deliveryNumber: Number(deliveryNumber),
      products: allProducts.map(({ id, counter }) => (
        { productId: id, quantity: counter }
      )),
    };

    const config = {
      headers: {
        authorization: token,
      },
    };

    axios.post('http://localhost:3001/sales', order, config)
      .then((result) => result.data)
      .then((data) => {
        const { newOrderId } = data;
        localStorage.removeItem('carrinho');
        navigate(`/customer/orders/${newOrderId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavBar />
      <h2 className={ styles.title }>Pagamento</h2>
      <div className={ styles.tableContainer }>
        {allProducts.length > 0
          && <CheckoutTable
            key="1"
            items={ allProducts }
            setAllItems={ setAllProducts }
          />}
        <h3
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${orderTotal}` }
        </h3>
      </div>
      <h2>Detalhes</h2>
      <div className={ styles.container }>
        <form className={ styles.detailsForm } onSubmit={ handleSubmit }>
          <label htmlFor="sellers">
            Vendedor
            <select
              name="sellerId"
              id="sellers"
              onChange={ handleInput }
              data-testid="customer_checkout__select-seller"
            >
              {!input.sellerId.length && (
                <option>
                  Escolha um vendedor
                </option>
              )}
              {
                allSellers.map(({ name, id }) => (
                  <option key={ id } value={ id }>
                    { name }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              name="deliveryAddress"
              id="address"
              onChange={ handleInput }
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="number">
            Número
            <input
              type="number"
              name="deliveryNumber"
              id="number"
              onChange={ handleInput }
              data-testid="customer_checkout__input-address-number"
            />
          </label>
          <button
            type="submit"
            onSubmit={ handleSubmit }
            disabled={ !validFields() }
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            Finalizar compra
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
