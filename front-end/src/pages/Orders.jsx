import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import styles from './CSS/Products.module.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:3001/sales', { params: { id } })
      .then((result) => result.data)
      .then((data) => setOrders([...data]))
      .catch((err) => {
        setOrders([]);
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <NavBar />
      { orders.length
        ? orders.map((order, numb) => (
          <OrderCard
            key={ order.id }
            numb={ numb + 1 }
            id={ order.id }
            status={ order.status }
            price={ order.totalPrice }
            date={ order.saleDate }
          />
        )) : <h1 className={ styles.title }>Não perca tempo, faça seu pedido!</h1> }

    </div>
  );
}
