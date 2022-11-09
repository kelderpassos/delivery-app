const md5 = require('md5');
const jwt = require('../../auth/JWT');

const mockNewUser = {
  name: 'luizinho',
  email: 'email@email.com',
  password: '123456',
  role: 'customer',
}

const mockUser = {
  id: 9,
  name: 'luizinho',
  email: 'email@email.com',
  password: md5('123456'),
  role: 'customer',
};

const mockAllSeller = [{
  id: 8,
  name: 'zezinho',
}];

const mockLogin = {
  id: 9,
  name: 'luizinho',
  email: 'email@email.com',
  role: 'customer',
  token: jwt.create({ id: mockUser.id, email: mockUser.email, role: mockUser.role }),
}

const mockCreate = {
  name: 'luizinho',
  email: 'email@email.com',
  role: 'customer',
  token: jwt.create({ id: mockUser.id, email: mockUser.email, role: mockUser.role }),
}

const adminToken = jwt.create({ id: 1, email: 'admin@email.com', role: 'administrator' });
const normalToken = jwt.create({ id: 1, email: 'customer@email.com', role: 'customer' });
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImN1c3RvbWVyQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjgwMjYxMjEsImV4cCI6MTY2ODExMjUyMX0.FH6LcE-KOgKxArxAsnQg28PZDH_yWe-XlBrc6izLipj'

module.exports = { mockUser, mockLogin, mockNewUser, mockCreate, mockAllSeller, adminToken, normalToken, invalidToken };