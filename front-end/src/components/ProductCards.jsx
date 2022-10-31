import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ProductCards({ id, name, urlImage, price }) {
  const [counter, setCounter] = useState(0);

  /*  const handleAddCart = () => {
    setItemAmount(itemAmount + 1);
    const totalPrice = price * itemAmount;
    const itemObj = { id, name, totalPrice, itemAmount };
    localStorage.setItem(name, JSON.stringify(itemObj));
  }; */

  const handleButtons = ({ target }) => {
    if (target.name === 'add') setCounter((prevState) => prevState + 1);
    if (target.name === 'sub') {
      setCounter((prevState) => (counter === 0 ? prevState : prevState - 1));
    }
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
        </section>
        <section>
          <p
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </p>
          <button
            name="sub"
            type="button"
            onClick={ handleButtons }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <div
            data-testid={ `customer_products__input-card-quantity-${id}` }
          >
            {counter}
          </div>
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
