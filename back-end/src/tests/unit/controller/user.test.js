const sinon = require('sinon');
const chai = require('chai');
const userService = require('../../../services/user.service');
const userController = require('../../../controller/user.controller');
const { mockLogin, mockCreate, adminToken, normalToken, mockAllSeller, invalidToken } = require('../../mocks/user');

const { expect } = chai;

describe('User Controller', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    sinon.stub(userService, 'login').resolves(mockLogin);
    sinon.stub(userService, 'customerRegister').resolves(mockCreate);
    sinon.stub(userService, 'findSellersNames').resolves(mockAllSeller);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  })

  describe('Login user', () => {
    it('With success', async () => {
      req.body = { email: 'valid@email.com', password: '123456' };
      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockLogin)).to.be.true;
    });
  });

  describe('Register user', () => {
    it('With success', async () => {
      req.body = { email: 'new@email.com', password: '123456' };
      await userController.customerRegister(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockCreate)).to.be.true;
    });
  });

  describe('Admin register user', () => {
    it('With success', async () => {
      req.body = { email: 'new@email.com', password: '123456' };
      req.headers = { authorization: adminToken };
      await userController.adminRegister(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(mockCreate)).to.be.true;
    });

    it('with failure - Not admin', async () => {
      req.body = { email: 'new@email.com', password: '123456' };
      req.headers = { authorization: normalToken };

      await userController.adminRegister(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Unauthorized' })).to.be.true;
    });

    it('with failure - Invalid Token', async () => {
      req.body = { email: 'new@email.com', password: '123456' };
      req.headers = { authorization: invalidToken };

      let error;
      try {
        await userController.adminRegister(req, res);  
      } catch (err) {
        error = err;
      }

      expect(error.message).to.be.equal('Expired or invalid token');
    });
  });

  describe('Get sellers names', () => {
    it('With success', async () => {
      await userController.findSellersNames(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockAllSeller)).to.be.true;
    });
  });
});