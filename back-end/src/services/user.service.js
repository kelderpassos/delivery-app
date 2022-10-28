const md5 = require('md5');
const { Op } = require('sequelize');
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

const customerRegister = async ({ name, email, password }) => {
  const userExists = await User.findOne({
    where: { [Op.or]: [
      { name },
      { email },
    ] },
  });

  if (userExists) throw new CustomError(409, 'Name or email already registered');

  const hashPassword = md5(password);

  await User.create({
    name,
    email,
    password: hashPassword,
    role: 'customer',
  });

  const token = jwt.create({ email, hashPassword });

  return token;
};

module.exports = { login, customerRegister };