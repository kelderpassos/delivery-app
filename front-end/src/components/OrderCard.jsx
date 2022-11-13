import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard({ id, status, price, date, numb }) {
  const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const year = date.slice(NUMBERS[0], NUMBERS[4]);
  const month = date.slice(NUMBERS[5], NUMBERS[7]);
  const day = date.slice(NUMBERS[8], NUMBERS[10]);

  return (
    <div>
      <Link to={ `/customer/orders/${id}` }>
        <section>
          <div
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            {`Pedido: ${numb}`}
          </div>

          <p
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            {`Status: ${status}`}
          </p>
        </section>
        <section>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {price.replace('.', ',')}
          </p>
          <p
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {`${day}/${month}/${year}`}
          </p>
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
