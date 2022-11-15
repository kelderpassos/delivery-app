import React from 'react';
import PropTypes from 'prop-types';
import styles from './CSS/DetailsTable.module.css';

export default function DetailsTable({ allProducts }) {
  return (
    <table className={ styles.container }>
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
                { quantity }
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
                { totalPrice }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
