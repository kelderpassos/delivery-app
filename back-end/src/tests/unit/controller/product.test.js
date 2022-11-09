const sinon = require('sinon');
const chai = require('chai');
const productService = require('../../../services/product.service');
const productController = require('../../../controller/product.controller');
const { mockAllProducts } = require('../../mocks/product');

const { expect } = chai;

describe('Product Controller', () => {
  const req = {};
  const res = {};

  before(() => {
    sinon.stub(productService, 'getAllProducts').resolves(mockAllProducts);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  after(() => {
    sinon.restore();
  });

  describe('Get all products', () => {
    it('With success', async () => {
      await productController.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockAllProducts)).to.be.true;
    });
  });
});