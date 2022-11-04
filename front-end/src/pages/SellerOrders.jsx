import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import SellerOrderCard from '../components/SellerOrderCard';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const config = {
      headers: {
        authorization: token,
      },
    };

    axios.get('http://localhost:3001/seller/orders', config)
      .then((result) => result.data)
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar />
      <section>
        {orders.length
          ? (
            orders.map((order, index) => (
              <SellerOrderCard
                key={ index }
                num={ index }
                id={ order.id }
                totalPrice={ order.totalPrice }
                deliveryAddress={ order.deliveryAddress }
                deliveryNumber={ order.deliveryNumber }
                saleDate={ order.saleDate }
                status={ order.status }
              />
            ))
          ) : (
            <h2>No orders yet</h2>
          )}
      </section>
    </div>
  );
}
