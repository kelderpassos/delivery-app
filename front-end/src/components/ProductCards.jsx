import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { CartDispatchContext } from '../context/CartContext';

export default function ProductCards({ id, name, urlImage, price }) {
  const [counter, setCounter] = useState(0);
  const setCart = useContext(CartDispatchContext);

  useEffect(() => {
    setCounter(counter);
    const totalPrice = (price * counter).toFixed(2);
    const itemObj = { id, name, totalPrice, counter, price };

    if (counter === 0) {
      const arr = JSON.parse(localStorage.getItem('carrinho')) || [];
      const arrNew = arr.filter((element) => element.id !== itemObj.id);
      localStorage.setItem('carrinho', JSON.stringify(arrNew));
      const sumOfPrices = arrNew.reduce((acc, obj) => Number(obj.totalPrice) + acc, 0);
      setCart(sumOfPrices);
    } else {
      const arr = JSON.parse(localStorage.getItem('carrinho')) || [];
      const arrNew = arr.filter((element) => element.id !== itemObj.id);
      arrNew.push(itemObj);
      localStorage.setItem('carrinho', JSON.stringify(arrNew));
      const sumOfPrices = arrNew.reduce((acc, obj) => Number(obj.totalPrice) + acc, 0);
      setCart(sumOfPrices);
    }
  }, [counter, id, name, price, setCart]);

  const handleButtons = ({ target }) => {
    if (target.name === 'add') {
      setCounter(Number(counter) + 1);
    }
    if (target.name === 'sub') {
      setCounter((prevState) => (Number(counter) === 0 ? prevState : prevState - 1));
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setCounter(value);
  };

  return (
    <div>
      <div key={ id }>
        <section>
          <p
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {price.replace('.', ',')}
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
            onChange={ handleChange }
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
