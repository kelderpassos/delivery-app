import React from 'react';
import PropTypes from 'prop-types';

export default function DetailsTable({ allProducts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {allProducts.map((product, ind) => (
          <tr key={ ind }>
            <td
              data-testid={ `customer_order_details_
              _element-order-table-item-number-${ind}` }
            >
              { ind + 1 }
            </td>
            <td
              data-testid={ `customer_order_details_
              _element-order-table-name-${ind}` }
            >
              { product.name }
            </td>
            <td
              data-testid={ `customer_order_details_
              _element-order-table-quantity-${ind}` }
            >
              { product.quantity }
            </td>
            <td
              data-testid={ `customer_order_details_
              _element-order-table-unit-price-${ind}` }
            >
              { product.price.replace('.', ',') }
            </td>
            <td
              data-testid={ `customer_order_details_
              _element-order-table-sub-total-${ind}` }
            >
              { product.total }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
