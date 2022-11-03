import React, { useEffect, useState } from 'react';
import DetailsTable from '../components/DetailsTable';
import NavBar from '../components/NavBar';
// import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  // const { id } = useParams();

  // const getCostumeOrders = () => {
  //   axios.get(`http://localhost:3001/customer/orders/${id}`)
  //     .then((result) => result.data)
  //     .then((data) => setOrders(data || []))
  //     .catch((err) => console.log(err));
  // };

  const [allProducts, setAllProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0.00);

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

  return (
    <div>
      <NavBar />
      <h3>Detail Order</h3>
      <div>
        <DetailsTable items={ allProducts } />
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          { `Total: R$ ${orderTotal}` }
        </p>
      </div>
    </div>
  );
}
