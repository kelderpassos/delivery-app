import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

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

  console.log(orders);

  return (
    <div>
      <NavBar />
      <p>ta de casas</p>
    </div>
  );
}
