import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SellerDetailsTable from '../components/SellerDetailsTable';
import NavBar from '../components/NavBar';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/sales/${id}`)
      .then((result) => result.data)
      .then((data) => {
        setOrder(data);
        setProducts(data.products);
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

  const orderId = order ? order.id : '0000';
  const status = order ? order.status : '';
  const data = order ? formatDate(order.saleDate) : '';
  const total = order ? order.totalPrice.replace('.', ',') : '00,00';

  return (
    <div>
      <NavBar />
      <div>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>
          { `Order ${orderId}` }
        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          { `${data}` }
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { status }
        </p>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          disabled={ status !== 'Pendente' }
        >
          Prepare Order
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          type="button"
          disabled={ status !== 'Preparando' }
        >
          Out For Delivery
        </button>
      </div>
      <h3>Detail Order</h3>
      <div>
        {products.length > 0 && (
          <SellerDetailsTable
            allProducts={ products }
          />
        )}
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: R$ ${total}` }
        </p>
      </div>
    </div>
  );
}
