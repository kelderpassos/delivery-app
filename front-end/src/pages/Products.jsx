import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ProductCards from '../components/ProductCards';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

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
        <ProductCards products={ allProducts } />
      </main>
    </div>
  );
}
