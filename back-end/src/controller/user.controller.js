const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login({ email, password });

  return res.status(200).json(user);
};

const customerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.customerRegister({ name, email, password });

  res.status(201).json(newUser);
};

module.exports = { login, customerRegister };