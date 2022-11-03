import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, status, price, date }) {
  return (
    <div>
      <section>
        <div
          data-testid={ `customer_orders__element-order-${id}` }
        >
          {`Pedido: ${id}`}
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
          {date.replaceAll('-', '/')}
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          {price.replace('.', ',')}
        </p>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
