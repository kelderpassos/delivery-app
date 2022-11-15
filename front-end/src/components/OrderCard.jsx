import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CSS/OrderCard.module.css';

export default function OrderCard({ id, status, price, date, numb }) {
  const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const year = date.slice(NUMBERS[0], NUMBERS[4]);
  const month = date.slice(NUMBERS[5], NUMBERS[7]);
  const day = date.slice(NUMBERS[8], NUMBERS[10]);

  return (
    <div className={ styles.orderContainer }>
      <Link to={ `/customer/orders/${id}` }>
        <section>
          <h3
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            {`Pedido: ${numb}`}
          </h3>

          <h3
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            {`Status: ${status}`}
          </h3>
          <h3
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {`Valor: ${price.replace('.', ',')}`}
          </h3>
          <h3
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {`Data: ${day}/${month}/${year}`}
          </h3>
        </section>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  numb: PropTypes.number.isRequired,
};
