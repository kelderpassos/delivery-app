import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './CSS/Login.module.css';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const redirectObj = {
    customer: '/customer/products',
    seller: '/seller/orders',
    administrator: '/admin/manage',
  };

  const validFields = () => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(input.email);
    const FIVE = 5;

    return validEmail && input.password.length > FIVE;
  };

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:3001/login/', input)
      .then((response) => response.data)
      .then((data) => {
        const stringfyData = JSON.stringify(data);
        localStorage.setItem('user', stringfyData);
        navigate(redirectObj[data.role]);
      })
      .catch(() => setInvalidLogin(true));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      navigate(redirectObj[data.role]);
    }
  });

  return (
    <div className={ styles.loginContainer }>
      <h2>Acesse a plataforma</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          E-mail
          <input
            name="email"
            type="text"
            onChange={ handleInput }
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            onChange={ handleInput }
            data-testid="common_login__input-password"
          />
        </label>
        <button
          type="submit"
          name="login"
          data-testid="common_login__button-login"
          disabled={ !validFields() }
        >
          Entrar
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ redirectToRegister }
        >
          Cadastro
        </button>
        {invalidLogin && (
          <h4 data-testid="common_login__element-invalid-email">Dados inválidos</h4>
        )}
      </form>
      <div />
      <Footer />
    </div>
  );
}
