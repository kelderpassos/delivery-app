import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';

export default function Checkout() {
  const [allProducts, setAllProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0.00);
  const [allSellers, setAllSellers] = useState([]);
  const [input, setInput] = useState({ seller: '', address: '', number: '' });

  const calculateTotal = () => {
    const total = allProducts.reduce((acc, crr) => acc + Number(crr.totalPrice), 0);
    setOrderTotal(total.toFixed(2).replace('.', ','));
  };
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Item</th>
  //         <th>Description</th>
  //         <th>Quantity</th>
  //         <th>Price</th>
  //         <th>Subtotal</th>
  //         <th>Remove Item</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {allProducts.map((product, ind) => (
  //         <tr key={ ind }>
  //           <td
  //             data-testid={ `customer_checkout__element-order-table-item-number-${ind}` }
  //           >
  //             { ind + 1 }
  //           </td>
  //           <td
  //             data-testid={ `customer_checkout__element-order-table-name-${ind}` }
  //           >
  //             { product.name }
  //           </td>
  //           <td
  //             data-testid={ `customer_checkout__element-order-table-quantity-${ind}` }
  //           >
  //             { product.counter }
  //           </td>
  //           <td
  //             data-testid={ `customer_checkout__element-order-table-unit-price-${ind}` }
  //           >
  //             { product.price }
  //           </td>
  //           <td
  //             data-testid={ `customer_checkout__element-order-table-sub-total-${ind}` }
  //           >
  //             { product.totalPrice }
  //           </td>
  //           <td>
  //             <button
  //               type="button"
  //               value={ product.id }
  //               onClick={ handleRemove }
  //               data-testid={ `customer_checkout__element-order-table-remove-${ind}` }
  //             >
  //               Remove
  //             </button>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );

  useEffect(() => {
    axios.get('http://localhost:3001/sellers')
      .then((result) => result.data)
      .then((data) => setAllSellers(data || []))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getItems = localStorage.getItem('carrinho');
    const orderItems = JSON.parse(getItems);
    console.log(orderItems);
    setAllProducts(orderItems || []);
  }, []);

  useEffect(() => {
    calculateTotal();
  });

  const handleInput = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  return (
    <div>
      <NavBar />
      <h3>Finish Order</h3>
      <div>
        {allProducts.length > 0
          && <CheckoutTable items={ allProducts } setAllItems={ setAllProducts } />}
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${orderTotal}` }
        </p>
      </div>
      <h3>Details and Delivery Address</h3>
      <form>
        <label htmlFor="sellers">
          Seller
          <select
            name="seller"
            id="sellers"
            onChange={ handleInput }
            data-testid="customer_checkout__select-seller"
          >
            {!input.seller.length && (
              <option>
                Chose a seller
              </option>
            )}
            {
              allSellers.map(({ name }, id) => (
                <option key={ id }>
                  { name }
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="address">
          Address
          <input
            type="text"
            name="address"
            id="address"
            onChange={ handleInput }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Number
          <input
            type="number"
            name="number"
            id="number"
            onChange={ handleInput }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          FINISH ORDER
        </button>
      </form>
    </div>
  );
}
