import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, status, price, date }) {
  return (
    <div>
      <section>
        <div>
          {`Pedido: ${id}`}
        </div>
        <p>
          {`Status: ${status}`}
        </p>
      </section>
      <section>
        <p>
          {price.replace('.', ',')}
        </p>
        <p>
          {date}
        </p>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};
