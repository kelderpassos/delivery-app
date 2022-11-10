const { mockAllProducts } = require("./product");

const mockSale = {
  userId: 1,
  sellerId: 2,
  totalPrice: 69.00,
  deliveryAddress: 'Rodovia',
  deliveryNumber: 173,
  products: mockAllProducts,
};

const mockSaleRegistered = {
  ...mockSale,
  id: 1,
  saleDate: '20022-11-04 18:32:50',
  status: 'Entregue',
};

module.exports = { mockSale, mockSaleRegistered }