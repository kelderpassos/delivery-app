import React from 'react';
import PropTypes from 'prop-types';

export default function SellerDetailsTable({ allProducts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {allProducts.map((product, ind) => {
          const { quantity } = product.saleProducts[0];
          const totalPrice = (product.price * quantity).toFixed(2).replace('.', ',');
          return (
            <tr key={ ind }>
              <td
                data-testid={ `seller_order_details__
                element-order-table-item-number-${ind}` }
              >
                { ind + 1 }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${ind}` }
              >
                { product.name }
              </td>
              <td
                data-testid={ `seller_order_details__
                element-order-table-quantity-${ind}` }
              >
                { quantity }
              </td>
              <td
                data-testid={ `seller_order_details__
                element-order-table-unit-price-${ind}` }
              >
                { product.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `seller_order_details__
                element-order-table-sub-total-${ind}` }
              >
                { totalPrice }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

SellerDetailsTable.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
