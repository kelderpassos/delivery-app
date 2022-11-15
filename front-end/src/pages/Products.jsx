import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import NavBar from '../components/NavBar';
import ProductCards from '../components/ProductCards';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';
import styles from './CSS/Products.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

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
      <main className={ styles.productsContainer }>
        <section>
          <Slider { ...settings } className={ styles.slider }>
            {allProducts.map((product) => (
              <ProductCards
                key={ product.id }
                id={ product.id }
                name={ product.name }
                urlImage={ product.urlImage }
                price={ product.price }
              />
            ))}
          </Slider>
        </section>
        <button
          type="button"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ isDisabled }
          className={ styles.cartButton }
        >
          {`Finalizar compra: ${cart.toFixed(2).replace('.', ',')}`}
        </button>
      </main>
      <Footer />
    </div>
  );
}
