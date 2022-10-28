import React from 'react';

export default function Login() {
  const handleInput = () => {

  };

  const handleLogin = () => {

  };

  return (
    <div>
      <section>
        <h4>Login</h4>
        <form onChange={ handleLogin }>
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
          >
            Log in
          </button>
          <button
            type="submit"
            data-testid="common_login__button-register"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
