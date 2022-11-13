const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const saleService = require('../../../services/sale.service');
const saleProductsService = require('../../../services/saleProducts.service');
const userService = require('../../../services/user.service');
const { mockSale, mockSaleRegistered } = require('../../mocks/sale');

const { Sale } = models;
const { expect } = chai;

describe('Sales Service', () => {
  before(() => {
    sinon.stub(userService, 'findByName').resolves({ id: 2 });
    sinon.stub(Sale, 'create').resolves({ id: 10 });
    sinon.stub(saleProductsService, 'bulkCreate').resolves();
    sinon.stub(Sale, 'findAll').resolves([mockSaleRegistered]);
    sinon.stub(Sale, 'findByPk')
      .onCall(0).resolves(mockSaleRegistered)
      .resolves(null);

    sinon.stub(Sale, 'update').resolves(true);
  });

  after(() => {
    sinon.restore();
  });

  describe('Create a sale', () => {
    it('With success', async () => {
      const result = await saleService.create(mockSale);

      expect(result).to.be.equal(10);
    });
  });

  describe('Get sales by seller', () => {
    it('With success', async () => {
      const result = await saleService.getSalesBySeller(mockSaleRegistered.sellerId);

      expect(result).to.be.deep.equal([mockSaleRegistered]);
    });
  });

  describe('Get sales by customer', () => {
    it('With success', async () => {
      const result = await saleService.getByConsumer(mockSaleRegistered.userId);

      expect(result).to.be.deep.equal([mockSaleRegistered]);
    });
  });

  describe('Get sale by id', () => {
    it('With success', async () => {
      const result = await saleService.getById(mockSaleRegistered.id);

      expect(result).to.be.deep.equal(mockSaleRegistered);
    });

    it('With failure - sale not found', async () => {
      let error;

      try {
        await saleService.getById(9999);
      } catch (err) {
        error = err;
      }

      expect(error.message).to.be.equal('sale not found');
      expect(error.status).to.be.equal(404);
    });
  });

  describe('Update a sale', () => {
    it('With success', async () => {
      const result = await saleService.updateStatus({ id: 1, status: 'novo' });
      expect(result).to.be.equal(true);
    });
  });
});