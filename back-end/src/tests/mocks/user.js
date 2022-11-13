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

module.exports = { mockUser, mockLogin, mockNewUser, mockCreate, mockAllSeller };