import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [loggedUser, setLoggedUser] = useState('');

  return (
    <header>
      <nav>
        <NavLink to="/products">Produtos</NavLink>
        <NavLink to="/orders">Meus Pedidos</NavLink>
        <NavLink to="/user">{loggedUser}</NavLink>
        <NavLink to="/logout">Sair</NavLink>
      </nav>
    </header>
  );
}
