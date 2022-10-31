import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import ProductCard from '../components/productCard';

export default function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      await axios.get('http://localhost:3001/customer/products')
        .then((result) => setProducts(result.data));
    };
    getProducts();
  });

  return (
    <div>
      <Navbar />
      {
        products?.map(({ id, urlImage, name, price }) => (
          <ProductCard
            key={ id }
            id={ id }
            image={ urlImage }
            name={ name }
            price={ price }
          />
        ))
      }
    </div>
  );
}
