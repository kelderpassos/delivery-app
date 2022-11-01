import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();
const CartDispatchContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(0);

  // const getCart = () => {
  //   const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
  //   const totalPrice = cart.reduce((sum, product) => Number(product.totalPrice) + sum, 0);

  //   setCart(totalPrice);
  // };

  return (
    <CartContext.Provider value={ cart }>
      <CartDispatchContext.Provider value={ setCart }>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext, CartDispatchContext, CartProvider };
