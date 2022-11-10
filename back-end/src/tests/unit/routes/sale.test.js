const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const saleService = require('../../../services/sale.service');
const { mockSaleRegistered, mockSale } = require('../../mocks/sale');
const { adminToken } = require('../../mocks/token');

const { expect } = chai;
chai.use(chaiHttp);

describe('Sale route', () => {
  before(() => {
    sinon.stub(saleService, 'create').resolves(mockSaleRegistered.id);
    sinon.stub(saleService, 'getSalesBySeller').resolves([mockSaleRegistered]);
    sinon.stub(saleService, 'getByConsumer').resolves([mockSaleRegistered]);
    sinon.stub(saleService, 'getById').resolves(mockSaleRegistered);
    sinon.stub(saleService, 'updateStatus').resolves();
  });

  after(() => {
    sinon.restore();
  });

  describe('POST /sales', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .post('/sales')
        .set({ "authorization": adminToken })
        .send(mockSale);

        expect(response.body).to.be.deep.equal({ newOrderId: mockSaleRegistered.id });
    });
  });

  describe('GET /sales/:id', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .get('/sales/1');

        expect(response.body).to.be.deep.equal(mockSaleRegistered);
    });
  });

  describe('GET /sales?id', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .get('/sales?id=1');

      expect(response.body).to.be.deep.equal([mockSaleRegistered]);
    });
  });

  describe('GET /seller/orders', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .get('/seller/orders')
        .set({ "authorization": adminToken });

      expect(response.body).to.be.deep.equal([mockSaleRegistered]);
    });
  });

  describe('PATCH /sales/:id', () => {
    it('With success', async () => {
      const response = await chai.request(app)
        .patch('/sales/1')
        .send({ status: 'mock' });

        expect(response.body).to.be.deep.equal({ status: 'mock' });
    });
  });
});