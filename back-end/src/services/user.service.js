const md5 = require('md5');
const models = require('../database/models');
const jwt = require('../auth/JWT');
const CustomError = require('../helpers/CustomError');

const { User } = models;

const login = async ({ email, password }) => {
  const result = await User.findOne({
    where: { email },
  });

  if (!result) throw new CustomError(404, 'User not found');

  const hashPassword = md5(password);

  if (result.password !== hashPassword) throw new CustomError(400, 'Invalid password');

  const token = jwt.create({ email, hashPassword });

  return token;
};

module.exports = { login };