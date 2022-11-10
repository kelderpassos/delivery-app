const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../api/app');
const userService = require('../../../services/user.service');
const { mockLogin, mockNewUser, mockCreate, mockAllSeller } = require('../../mocks/user');
const { adminToken } = require('../../mocks/token');

const { expect } = chai;
chai.use(chaiHttp);

describe('User route', () => {
  beforeEach(() => {
    sinon.stub(userService, 'login').resolves(mockLogin);
    sinon.stub(userService, 'customerRegister').resolves(mockCreate);
    sinon.stub(userService, 'findSellersNames').resolves(mockAllSeller);
  });

  afterEach(() => {
    sinon.restore();
  })

  describe('POST /login', () => {
    it('With success', async () => {
      const response = await chai.request(app)
      .post('/login')
      .send({ email: 'valid@email.com', password: '123456' });

      expect(response.body).to.be.deep.equal(mockLogin);
    });
  });

  describe('POST /register', () => {
    it('With success', async () => {
      const response = await chai.request(app)
      .post('/register')
      .send(mockNewUser);

      expect(response.body).to.be.deep.equal(mockCreate);
    });
  });

  describe('POST /admin/register', () => {
    it('With success', async () => {
      const response = await chai.request(app)
      .post('/admin/register')
      .set({ "authorization": adminToken })
      .send(mockNewUser);

      expect(response.body).to.be.deep.equal(mockCreate);
    });
  });

  describe('GET /sellers', () => {
    it('With success', async () => {
      const response = await chai.request(app)
      .get('/sellers');

      expect(response.body).to.be.deep.equal(mockAllSeller);
    });
  });
});