const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const productService = require('../../../services/product.service');
const { mockAllProducts } = require('../../mocks/product');

const { expect } = chai;
chai.use(chaiHttp);

describe('Product route', () => {
  before(() => {
    sinon.stub(productService, 'getAllProducts').resolves(mockAllProducts)
  });

  after(() => {
    sinon.restore();
  });

  describe('GET /customer/products', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .get('/customer/products');

      expect(response.body).to.be.deep.equal(mockAllProducts);
    });
  });
});