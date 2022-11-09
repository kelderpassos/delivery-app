const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const productService = require('../../../services/product.service');
const { mockAllProducts } = require('../../mocks/product');

const { Product } = models;
const { expect } = chai;

describe('Product Service', () => {
  before(() => {
    sinon.stub(Product, 'findAll').resolves(mockAllProducts);
  });

  after(() => {
    sinon.restore();
  });

  describe('Get all products', () => {
    it('With success', async () => {
      const result = await productService.getAllProducts();

      expect(result).to.be.deep.equal(mockAllProducts);
    });
  });
});