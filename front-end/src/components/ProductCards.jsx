import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCards({ products }) {
  const [counter, setCounter] = useState(0);

  const handleButtons = ({ target }) => {
    if (target.name === 'add') setCounter((prevState) => prevState + 1);
    if (target.name === 'sub') setCounter((prevState) => prevState - 1);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={ product.id }>
          <section>
            <p
              data-testid="customer_products__element-card-price-<id>"
            >
              {product.price}
            </p>
            <img
              src={ product.urlImage }
              alt={ `${product.name}` }
              data-testid="customer_products__img-card-bg-image-<id>"
            />
          </section>
          <section>
            <p
              data-testid="customer_products__button-card-add-item-<id>"
            >
              {product.name}
            </p>
            <button
              name="sub"
              type="button"
              onClick={ handleButtons }
              data-testid="customer_products__button-card-rm-item-<id>"
            >
              -
            </button>
            <div
              data-testid="customer_products__input-card-quantity-<id>"
            >
              {counter}
            </div>
            <button
              name="add"
              type="button"
              onClick={ handleButtons }
              data-testid="customer_products__button-card-add-item-<id>"
            >
              +
            </button>
          </section>
        </div>
      ))}
    </div>
  );
}

ProductCards.propTypes = {
  products: PropTypes.arrayOf.isRequired,
};
