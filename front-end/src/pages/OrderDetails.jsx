import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailsTable from '../components/DetailsTable';
import NavBar from '../components/NavBar';
import styles from './CSS/OrderDetails.module.css';

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
      <main className={ styles.mainContainer }>
        <div className={ styles.statusContainer }>
          <h4 data-testid="customer_order_details__element-order-details-label-order-id">
            { `Pedido ${orderId}` }
          </h4>
          <h4>
            { `${seller?.name}` }
          </h4>
          <h4>
            { `${data}` }
          </h4>
          <h4
            data-testid={ statusId }
          >
            { status }
          </h4>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ status !== 'Em Trânsito' }
            value="Entregue"
            onClick={ updateStatus }
          >
            Entregue
          </button>
        </div>
        <h3>Detalhes do Pedido</h3>
        <div className={ styles.tableContainer }>
          {products.length > 0 && (
            <DetailsTable
              allProducts={ products }
            />
          )}
          <h4
            className={ styles.total }
          >
            { `Total: R$ ${total}` }
          </h4>
        </div>
      </main>
    </div>
  );
}
