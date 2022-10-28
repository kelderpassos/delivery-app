const md5 = require('md5');
const models = require('../database/models');

const { UserModel } = models;

const login = async ({ email, password }) => {
  const result = await UserModel.findOne({
    where: { email },
  });

  const hashPassword = md5(password);

  if (!result.password === hashPassword) throw new Error('Invalid password');

  return true;
};

module.exports = { login };