import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ProductCards({ id, name, urlImage, price }) {
  const [counter, setCounter] = useState(0);

  const handleButtons = ({ target }) => {
    if (target.name === 'add') {
      setCounter(counter + 1);
    } else {
      setCounter((prevState) => (counter === 0 ? prevState : prevState - 1));
    }
    const totalPrice = (price * counter).toFixed(2);
    const itemObj = { id, name, totalPrice, counter };

    localStorage.setItem(name, JSON.stringify(itemObj));
  };

  return (
    <div>
      <div key={ id }>
        <section>
          <p
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {price}
          </p>
          <img
            src={ urlImage }
            alt={ `${name}` }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
          />
          <p
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </p>
        </section>
        <section>
          <button
            name="sub"
            type="button"
            onClick={ handleButtons }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="number"
            value={ counter }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            name="add"
            type="button"
            onClick={ handleButtons }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </section>
      </div>

    </div>
  );
}

ProductCards.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
