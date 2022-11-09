const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const userService = require('../../../services/user.service');
const { mockUser, mockLogin } = require('../../mocks/user');
const CustomError = require('../../../helpers/CustomError');


const { User } = models;
const { expect } = chai;

describe('User Service', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne')
      .onCall(0).resolves(mockUser)
      .onCall(1).resolves(mockUser)
      .onCall(2).resolves({});
  });

  afterEach(() => {
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

      expect(error.message).to.be.equal('Invalid password');
      expect(error?.status).to.be.equal(400);
    });
  });
});
