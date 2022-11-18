import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from './CSS/Admin.module.css';

export default function Admin() {
  const [input, setInput] = useState({ name: '',
    email: '',
    password: '',
    role: '' });
  const [invalidRegistered, setInvalidRegistered] = useState(false);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setUserToken(token);
  }, [userToken]);

  const validateFields = () => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validEmail = emailPattern.test(input.email);
    const FIVE = 5;
    const ELEVEN = 11;

    return validEmail && input.password.length > FIVE && input.name.length > ELEVEN
     && input.role !== '';
  };

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
    console.log(input);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.post('http://localhost:3001/admin/register', input, { headers: { authorization: userToken } })
      .catch(() => setInvalidRegistered(true));
  };

  return (
    <div>
      <NavBar />
      <h4 className={ styles.title }>Cadastrar novos usuários</h4>
      <form className={ styles.adminForm } onSubmit={ handleSubmit }>
        <label htmlFor="name">
          Nome
          <input
            name="name"
            type="text"
            onChange={ handleInput }
            data-testid="admin_manage__input-name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            name="email"
            type="text"
            onChange={ handleInput }
            data-testid="admin_manage__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            onChange={ handleInput }
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role">
          Função
          <select
            name="role"
            defaultValue=""
            onChange={ handleInput }
            data-testid="admin_manage__select-role"
          >
            <option value=""> </option>
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <button
          type="submit"
          name="login"
          disabled={ !validateFields() }
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
        {invalidRegistered && (
          <h3 data-testid="admin_manage__element-invalid-register">
            Usuário já cadastrado
          </h3>
        )}
      </form>
    </div>
  );
}
