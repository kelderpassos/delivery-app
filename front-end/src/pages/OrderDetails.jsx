import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailsTable from '../components/DetailsTable';
import NavBar from '../components/NavBar';

const statusId = 'customer_order_details__element-order-details-label-delivery-status';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/sales/${id}`)
      .then((result) => result.data)
      .then((data) => {
        setOrder(data);
        setProducts(data.products);
        setStatus(data.status);
      })
      .catch((err) => {
        setOrder(null);
        console.log(err);
      });
  }, [id]);

  const formatDate = (date) => {
    const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const year = date.slice(NUMBERS[0], NUMBERS[4]);
    const month = date.slice(NUMBERS[5], NUMBERS[7]);
    const day = date.slice(NUMBERS[8], NUMBERS[10]);

    return `${day}/${month}/${year}`;
  };

  const updateStatus = ({ target }) => {
    const { value } = target;
    axios.patch(
      `http://localhost:3001/sales/${id}`,
      { status: value },
    ).then(() => setStatus(value))
      .catch((err) => console.log(err));
  };

  const seller = order ? order.seller : null;
  const orderId = order ? order.id : '0000';
  const data = order ? formatDate(order.saleDate) : '';
  const total = order ? order.totalPrice.replace('.', ',') : '00,00';

  return (
    <div>
      <NavBar />
      <div>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          { `Order ${orderId}` }
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          { `${seller?.name}` }
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          { `${data}` }
        </p>
        <p
          data-testid={ statusId }
        >
          { status }
        </p>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          disabled={ status !== 'Em Trânsito' }
          value="Entregue"
          onClick={ updateStatus }
        >
          Delivered
        </button>
      </div>
      <h3>Detail Order</h3>
      <div>
        {products.length > 0 && (
          <DetailsTable
            allProducts={ products }
          />
        )}
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          { `Total: R$ ${total}` }
        </p>
      </div>
    </div>
  );
}
