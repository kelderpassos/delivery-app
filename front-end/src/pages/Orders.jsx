import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios.get('http://localhost:3001/customer/orders')
      .then((result) => result.data)
      .then((data) => setOrders([...data]))
      /* mudar para data quando back estiver pronto */
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
        ? orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            price={ order.price }
            date={ order.date }
          />
        )) : 'No orders yet' }

    </div>
  );
}
