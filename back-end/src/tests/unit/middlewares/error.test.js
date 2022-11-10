const sinon = require('sinon');
const chai = require('chai');

const errorMiddleware = require('../../../middlewares/error');
const CustomError = require('../../../helpers/CustomError');

const { expect } = chai;

describe('Error middleware', () => {
  const req = {};
  const res = {};
  const next = () => {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  afterEach(() => {
    sinon.restore();
  });

  it('When called with a default error', () => {
    const defaultError = new Error('mock message');

    errorMiddleware(defaultError, req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: 'mock message' })).to.be.true;
  });

  it('When called with a custom error', () => {
    const customError = new CustomError(123, 'mock custom error');

    errorMiddleware(customError, req, res, next);

    expect(res.status.calledWith(123)).to.be.true;
    expect(res.json.calledWith({ message: 'mock custom error' })).to.be.true;
  });
});
