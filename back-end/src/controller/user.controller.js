const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login({ email, password });

  return res.status(200).json({ token });
};

const customerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const token = await userService.customerRegister({ name, email, password });

  res.status(201).json({ token });
};

module.exports = { login, customerRegister };