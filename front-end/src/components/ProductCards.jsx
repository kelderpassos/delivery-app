import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CartDispatchContext } from '../context/CartContext';
import styles from './CSS/ProductCards.module.css';

export default function ProductCards({ id, name, urlImage, price }) {
  const [counter, setCounter] = useState(0);
  const setCart = useContext(CartDispatchContext);
  const path = useLocation().pathname;

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
    <div key={ id }>
      <section className={ styles.productContainer }>
        <img
          src={ urlImage }
          alt={ `${name}` }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <h3
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h3>
        <h4
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$${price.replace('.', ',')}`}
        </h4>
      </section>

      {path === '/' ? '' : (
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
        </section>)}
    </div>
  );
}

ProductCards.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
