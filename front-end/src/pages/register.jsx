import React, { useState } from 'react';

export default function Register() {
  const [input, setInput] = useState({ name: '', email: '', password: '' });

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

  return (
    <div>
      <section>
        <h4>Register</h4>
        <form>
          <label htmlFor="name">
            Name
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
            Password
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
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
