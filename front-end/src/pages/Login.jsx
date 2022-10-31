import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

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

    axios.post('http://localhost:3001/login', input)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (!data.token) {
          setInvalidLogin(true);
        } else {
          const stringfyData = JSON.stringify(data);
          localStorage.setItem('userData', stringfyData);
          navigate('/customer/products');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <section>
        <h4>Login</h4>
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
            Password
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
            Log in
          </button>
          <button
            type="submit"
            data-testid="common_login__button-register"
            onClick={ redirectToRegister }
          >
            Subscribe
          </button>
          {invalidLogin && (
            <p data-testid="common_login__element-invalid-email">Wrong credentials</p>
          )}
        </form>
      </section>
    </div>
  );
}