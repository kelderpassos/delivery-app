import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import ProductCards from '../components/ProductCards';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const cart = useContext(CartContext);

  const request = async () => {
    const { data } = await axios.get('http://localhost:3001/customer/products');
    setAllProducts(data);
  };

  useEffect(() => {
    request();
  }, []);

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
        <div
          data-testid="customer_products__checkout-bottom-value"
        >
          {cart.toFixed(2).replace('.', ',')}
        </div>
      </main>
    </div>
  );
}
