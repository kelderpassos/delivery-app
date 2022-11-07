import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCards from '../components/ProductCards';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  const request = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/customer/products');
      setAllProducts(data);
    } catch (err) {
      setAllProducts([]);
      console.log(err);
    }
  };

  useEffect(() => {
    request();
    if (cart > 0) setIsDisabled(false);
    if (cart === 0) setIsDisabled(true);
  }, [cart]);

  return (
    <div>
      <NavBar />
      <main>
        {
          allProducts.map((product) => (
            <ProductCards
              key={ product.id }
              id={ product.id }
              name={ product.name }
              urlImage={ product.urlImage }
              price={ product.price }
            />))
        }
        <button
          type="button"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ isDisabled }
          data-testid="customer_products__button-cart"
        >
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            {`Check cart: ${cart.toFixed(2).replace('.', ',')}`}
          </p>
        </button>
      </main>
    </div>
  );
}
