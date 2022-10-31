import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const navigateProducts = () => {
    navigate('/customer/products');
  };
  const navigateOrders = () => {
    navigate('/customer/orders');
  };
  const navigateProfile = () => {
    navigate('/customer/profile');
  };
  const navigateLogout = () => {
    navigate('/customer/logout');
  };
  return (
    <div>
      <li>
        <button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ navigateProducts }
        >
          Products

        </button>
      </li>
      <li>
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ navigateOrders }
        >
          Orders

        </button>
      </li>
      <li>
        <button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ navigateProfile }
        >
          name-test

        </button>
      </li>
      <li>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ navigateLogout }
        >
          Logout

        </button>
      </li>
    </div>
  );
}
