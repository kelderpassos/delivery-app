import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CSS/NavBar.module.css';
import image from '../assets/ebx1.png';

export default function NavBar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const roleObj = {
    customer: { text: 'Meus pedidos', url: '/customer/orders' },
    seller: { text: 'Pedidos', url: '/seller/orders' },
    administrator: { text: 'Gerenciamento de usuários', url: '/admin/manager' },
  };

  useEffect(() => () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
    setUserRole(user.role);
  });

  const defineNavLink = () => (
    <NavLink
      data-testid="customer_products__element-navbar-link-orders"
      to={ `${roleObj[userRole].url}` }
    >
      { roleObj[userRole].text }
    </NavLink>
  );

  return (
    <header className={ styles.header }>
      <img src={ image } alt="expresso logo" />
      <nav>
        <NavLink
          to="/"
        >
          Página Inicial
        </NavLink>
        {userRole === 'customer' && (
          <NavLink
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </NavLink>
        )}
        {userRole.length && defineNavLink()}
        <NavLink
          data-testid="customer_products__element-navbar-user-full-name"
          to="/user"
        >
          { userName }
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-logout"
          to="/"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </NavLink>
      </nav>
    </header>
  );
}
