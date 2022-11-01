const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login({ email, password });

  return res.status(200).json(user);
};

const customerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.customerRegister({ name, email, password });

  return res.status(201).json(newUser);
};

const findSellersNames = async (_req, res) => {
  const sellers = await userService.findSellersNames();
  return res.status(200).json(sellers);
};

module.exports = { login, customerRegister, findSellersNames };