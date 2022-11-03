import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const textObj = {
    customer: 'My Orders',
    seller: 'Orders',
    administrator: 'User Management',
  };

  useEffect(() => () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user.name);
    setUserRole(user.role);
  });

  const defineText = () => {
    let text = '';
    if (userRole.length) text = textObj[userRole];
    return text;
  };

  return (
    <header>
      <nav>
        {userRole === 'customer' && (
          <NavLink
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Products
          </NavLink>
        )}
        <NavLink
          data-testid="customer_products__element-navbar-link-orders"
          to={ `/${userRole}/orders` }
        >
          { defineText() }
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-user-full-name"
          to="/user"
        >
          { userName }
        </NavLink>
        <NavLink
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ () => localStorage.removeItem('user') }
        >
          Logout
        </NavLink>
      </nav>
    </header>
  );
}
