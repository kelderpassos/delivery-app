import React from 'react';
import PropTypes from 'prop-types';

export default function CheckoutTable({ items }) {
  const handleRemove = ({ target }) => {
    const { value } = target;
    console.log(value);
  };

  return (
    <table>
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
      <tbody>
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
              { product.price }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${ind}` }
            >
              { product.totalPrice }
            </td>
            <td>
              <button
                type="button"
                value={ product.id }
                onClick={ handleRemove }
                data-testid={ `customer_checkout__element-order-table-remove-${ind}` }
              >
                Remove
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
};
