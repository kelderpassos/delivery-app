import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SellerDetailsTable from '../components/SellerDetailsTable';
import NavBar from '../components/NavBar';
import styles from './CSS/SellerOrderDetails.module.css';

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

  const orderId = order ? order.id : '0000';
  const data = order ? formatDate(order.saleDate) : '';
  const total = order ? order.totalPrice.replace('.', ',') : '00,00';

  return (
    <div>
      <NavBar />
      <main className={ styles.mainContainer }>
        <div className={ styles.sellerOrdersContainer }>
          <h4
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            { `Order ${orderId}` }
          </h4>
          <h4 data-testid="seller_order_details__element-order-details-label-order-date">
            { `${data}` }
          </h4>
          <h4>{ status }</h4>
          <section>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              disabled={ status !== 'Pendente' }
              value="Preparando"
              onClick={ updateStatus }
            >
              Preparar pedido
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ status !== 'Preparando' }
              value="Em Trânsito"
              onClick={ updateStatus }
            >
              Liberar entrega
            </button>
          </section>
        </div>
        <h3>Detalhes do pedido</h3>
        <div className={ styles.tableContainer }>
          {products.length > 0 && (
            <SellerDetailsTable
              allProducts={ products }
            />
          )}
        </div>
        <h3
          data-testid="seller_order_details__element-order-total-price"
        >
          { `Total: R$ ${total}` }
        </h3>
      </main>
    </div>
  );
}
