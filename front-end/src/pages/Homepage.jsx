import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Chats, User, ShoppingCart } from 'phosphor-react';
import Slider from 'react-slick';
import image from '../assets/eb6.png';
import ProductCards from '../components/ProductCards';
import Footer from '../components/Footer';
import styles from './CSS/Homepage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Homepage() {
  const [allProducts, setAllProducts] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const request = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/products');
      setAllProducts(data);
    } catch (err) {
      setAllProducts([]);
      console.log(err);
    }
  };

  useEffect(() => {
    request();
  }, [allProducts]);

  return (
    <div>
      <header className={ styles.header }>
        <div>
          <img src={ image } alt="" />
        </div>
        <section className={ styles.navigationContainer }>
          <div>
            <Chats size={ 32 } />
            <NavLink to="/login" className={ styles.navigation }>Faça login</NavLink>
          </div>
          <div>
            <User size={ 32 } />
            <NavLink
              to="/register"
              className={ styles.navigation }
            >
              Crie sua conta
            </NavLink>
          </div>
          <div>
            <ShoppingCart size={ 32 } />
            <NavLink
              to="/customer/checkout"
              className={ styles.navigation }
            >
              Carrinho
            </NavLink>
          </div>
        </section>
      </header>
      <main className={ styles.productsHome }>
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
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
