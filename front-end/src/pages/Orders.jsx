import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState();

  const getOrders = () => {
    axios.get('http://localhost:3001/sales')
      .then((result) => result.data)
      .then((data) => setOrders(data || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => () => {
    getOrders();
  }, [orders]);

  return (
    <div>
      <NavBar />
      { orders
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
