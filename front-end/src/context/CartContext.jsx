import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();
const CartDispatchContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(0);

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
