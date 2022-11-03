import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    const req = {
      userId: JSON.parse(localStorage.getItem('user')).id,
    };
    console.log(req);
    await axios.get('http://localhost:3009/sales', { params: { userId: 3 } })
      .then((result) => result.data)
      .then((data) => setOrders(data || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  });

  return (
    <div>
      <NavBar />
      { orders
        ? orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            price={ order.totalPrice }
            date={ order.saleDate }
          />
        )) : 'No orders yet' }

    </div>
  );
}
