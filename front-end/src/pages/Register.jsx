import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './CSS/Register.module.css';

export default function Register() {
  const [input, setInput] = useState({ name: '',
    email: '',
    password: '',
    role: 'customer' });
  const [invalidRegistered, setInvalidRegistered] = useState(false);

  const navigate = useNavigate();

  const validateFields = () => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(input.email);
    const FIVE = 5;
    const ELEVEN = 11;

    return validEmail && input.password.length > FIVE && input.name.length > ELEVEN;
  };

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:3001/register', input)
      .then((response) => response.data)
      .then((data) => {
        const stringfyData = JSON.stringify(data);
        localStorage.setItem('user', stringfyData);
        navigate('/customer/products');
      })
      .catch(() => setInvalidRegistered(true));
  };

  return (
    <div className={ styles.registerContainer }>
      <h2>Cadastro</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome
          <input
            name="name"
            type="text"
            onChange={ handleInput }
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            name="email"
            type="text"
            onChange={ handleInput }
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            onChange={ handleInput }
            data-testid="common_register__input-password"
          />
        </label>
        <button
          type="submit"
          name="login"
          disabled={ !validateFields() }
          data-testid="common_register__button-register"
        >
          Finalizar cadastro
        </button>
        {invalidRegistered && (
          <h4 data-testid="common_register__element-invalid_register">
            Usuário já registrado
          </h4>
        )}
      </form>
      <Footer />
    </div>
  );
}
