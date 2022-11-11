const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const saleProductsService = require('../../../services/saleProducts.service');

const { salesProduct } = models;
const { expect } = chai;

describe('Sale-Products Service', () => {
  before(() => {
    sinon.stub(salesProduct, 'bulkCreate').resolves(true);
  });

  after(() => {
    sinon.restore();
  });

  describe('Register many procuts at once', () => {
    it('With success', async () => {
      const result = await saleProductsService.bulkCreate([]);

      expect(result).to.be.equal(true);
    });
  });
});