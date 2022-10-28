import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [loggedUser, setLoggedUser] = useState('');
  console.log(setLoggedUser());

  return (
    <header>
      <nav>
        <NavLink
          data-testid="customer_products__element-navbar-link-products"
          to="/products"
        >
          Produtos
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-orders"
          to="/orders"
        >
          Meus Pedidos
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-user-full-name"
          to="/user"
        >
          {loggedUser}
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-logout"
          to="/logout"
        >
          Sair
        </NavLink>
      </nav>
    </header>
  );
}
