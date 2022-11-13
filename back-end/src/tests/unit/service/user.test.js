const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const userService = require('../../../services/user.service');
const { mockUser, mockLogin, mockNewUser, mockCreate, mockAllSeller } = require('../../mocks/user');

const { User } = models;
const { expect } = chai;

describe('User Service', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .onCall(0).resolves(mockUser)
      .onCall(1).resolves(mockUser)
      .onCall(2).resolves(null)
      .onCall(3).resolves(mockUser)
      .onCall(4).resolves(null)
      .onCall(5).resolves(mockUser);

    sinon.stub(User, 'create').resolves(mockUser);
    sinon.stub(User, 'findAll').resolves(mockAllSeller)
  });

  after(() => {
    sinon.restore();
  });

  describe('Find an user by name', () => {
    it('With success', async () => {
      const result = await userService.findByName({ name: 'luizinho' });
      expect(result).to.be.deep.equal(mockUser);
    });
  });

  describe('Login user', () => {
    it('With success', async () => {
      const result = await userService.login({ email: 'email@email.com', password: '123456' });
      expect(result).to.be.deep.equal(mockLogin);
    });

    it('With failure - user not found', async () => {
      let error;
      try {
        await userService.login({ email: 'not_found@email.com', password: 'not_found' });
      } catch (err) {
        error = err;
      }

      expect(error.message).to.be.equal('User not found');
      expect(error?.status).to.be.equal(404);
    });

    it('With failure - invalid password', async () => {
      let error;
      try {
        await userService.login({ email: 'found@email.com', password: 'invalid' });
      } catch (err) {
        error = err;
      }

      expect(error.message).to.be.equal('Invalid password');
      expect(error?.status).to.be.equal(400);
    });
  });

  describe('Register a user', () => {
    it('With success', async () => {
      const result = await userService.customerRegister({ ...mockNewUser });
      expect(result).to.be.deep.equal(mockCreate);
    });

    it('with failure - user already registered', async () => {
      let error;

      try {
        await userService.customerRegister({ ...mockNewUser });
      } catch (err) {
        error = err;
      }

      expect(error.message).to.be.equal('Name or email already registered');
      expect(error?.status).to.be.equal(409);
    });
  });

  describe('Get all sellers', () => {
    it('With success', async () => {
      const result = await userService.findSellersNames();
      expect(result).to.be.deep.equal(mockAllSeller);
    });
  })
});
