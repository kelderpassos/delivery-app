import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const TEN = 10;

export default function SellerOrderCard({
  id, num, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
}) {
  const total = totalPrice.replace('.', ',');
  const date = saleDate.slice(0, TEN).replace(/-/g, '/');

  return (
    <Link to={ `/seller/orders/${id}` }>
      <div>
        <p data-testid={ `seller_orders__element-order-id-${id}` }>{ num + 1 }</p>
      </div>
      <div>
        <p data-testid={ `seller_orders__element-delivery-status-${id}` }>{ status }</p>
        <div>
          <p data-testid={ `seller_orders__element-order-date-${id}` }>
            { date }
          </p>
          <p data-testid={ `seller_orders__element-card-price-${id}` }>
            { `R$ ${total}` }
          </p>
        </div>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>
          { `${deliveryAddress}, ${deliveryNumber}` }
        </p>
      </div>
    </Link>
  );
}

SellerOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
