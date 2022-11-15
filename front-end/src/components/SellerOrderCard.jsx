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
        <section>
          <h4>{ num + 1 }</h4>
          <h4>{ status }</h4>
          <h4>{ date }</h4>
          <h4>{ `R$ ${total}` }</h4>
          <h4>{ `${deliveryAddress}, ${deliveryNumber}` }</h4>
        </section>
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
