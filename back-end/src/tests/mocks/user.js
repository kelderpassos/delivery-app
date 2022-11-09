const md5 = require('md5');
const jwt = require('../../auth/JWT');

const mockUser = {
  id: 9,
  name: 'luizinho',
  email: 'email@email.com',
  password: md5('123456'),
  role: 'customer',
};

const mockLogin = {
  id: 9,
  name: 'luizinho',
  email: 'email@email.com',
  role: 'customer',
  token: jwt.create({ id: mockUser.id, email: mockUser.email, role: mockUser.role }),
}

module.exports = { mockUser, mockLogin };