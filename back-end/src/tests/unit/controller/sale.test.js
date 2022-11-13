const sinon = require('sinon');
const chai = require('chai');
const saleService = require('../../../services/sale.service');
const saleController = require('../../../controller/sale.controller');
const { mockSale, mockSaleRegistered } = require('../../mocks/sale');
const { adminToken, normalToken } = require('../../mocks/token');

const { expect } = chai;

describe('Sale Controller', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    sinon.stub(saleService, 'create').resolves(mockSaleRegistered.id);
    sinon.stub(saleService, 'getSalesBySeller').resolves([mockSaleRegistered]);
    sinon.stub(saleService, 'getByConsumer').resolves([mockSaleRegistered]);
    sinon.stub(saleService, 'getById').resolves(mockSaleRegistered);
    sinon.stub(saleService, 'updateStatus').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  afterEach(() => {
    sinon.restore();
  });

  describe('Create a sale', () => {
    it('With success', async () => {
      req.body = { ...mockSale };
      req.headers = { authorization: adminToken };

      await saleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ newOrderId: mockSaleRegistered.id })).to.be.true;
    });
  });

  describe('Get a sale by seller id', () => {
    it('With success', async () => {
      req.headers = { authorization: normalToken };

      await saleController.getSalesBySeller(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([mockSaleRegistered])).to.be.true;
    });
  });

  describe('Get a sale by customer id', () => {
    it('With success', async () => {
      req.query = { id: mockSaleRegistered.userId };

      await saleController.getByConsumer(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([mockSaleRegistered])).to.be.true;
    });
  });

  describe('Get a sale by id', () => {
    it('With success', async () => {
      req.params = { id: mockSaleRegistered.userId };

      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockSaleRegistered)).to.be.true;
    });
  });

  describe('Update a sale status', () => {
    it('With success', async () => {
      req.params = { id: mockSaleRegistered.userId };
      req.body = { status: 'Mock' };

      await saleController.updateStatus(req, res);

      expect(res.status.calledWith(202)).to.be.true;
      expect(res.json.calledWith({ status: 'Mock' })).to.be.true;
    });
  });
});