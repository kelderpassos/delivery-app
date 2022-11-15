import React from 'react';
import PropTypes from 'prop-types';
import styles from './CSS/CheckoutTable.module.css';

export default function CheckoutTable({ items, setAllItems }) {
  const handleRemove = ({ target }) => {
    const { value } = target;
    const newProducts = items.filter(({ id }) => id !== Number(value));
    localStorage.setItem('carrinho', JSON.stringify(newProducts));
    setAllItems(newProducts);
  };

  return (
    <table className={ styles.table }>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
          <th>Remove Item</th>
        </tr>
      </thead>
      <tbody className={ styles.chato }>
        {items.map((product, ind) => (
          <tr key={ ind }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${ind}` }
            >
              { ind + 1 }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${ind}` }
            >
              { product.name }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${ind}` }
            >
              { product.counter }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${ind}` }
            >
              { product.price.replace('.', ',') }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${ind}` }
            >
              { product.totalPrice.replace('.', ',') }
            </td>
            <td>
              <button
                type="button"
                value={ product.id }
                onClick={ handleRemove }
                data-testid={ `customer_checkout__element-order-table-remove-${ind}` }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CheckoutTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  setAllItems: PropTypes.func.isRequired,
};
