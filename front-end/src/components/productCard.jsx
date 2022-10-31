import PropTypes from 'prop-types';
import React from 'react';

export default function ProductCard({ id, image, name, price }) {
  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        { name }
      </p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        <b>
          { price }
        </b>
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
        alt={ name }
      />
      <div>
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
        >
          Add to cart
        </button>
        <p>
          0
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
        >
          Remove from cart
        </button>
      </div>

    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
