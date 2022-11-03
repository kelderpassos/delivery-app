import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const username = JSON.parse(userData);
    setUser(username.name);
  }, [user]);

  return (
    <header>
      <nav>
        <NavLink
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          Produtos
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          Meus Pedidos
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-user-full-name"
          to="/user"
        >
          { user }
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </NavLink>
      </nav>
    </header>
  );
}
