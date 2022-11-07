const userService = require('../services/user.service');
const jwt = require('../auth/JWT');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login({ email, password });

  return res.status(200).json(user);
};

const customerRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await userService.customerRegister({ name, email, password, role });

  return res.status(201).json(newUser);
};

const adminRegister = async (req, res) => {
  const token = req.headers.authorization;
  const validation = jwt.validate(token);

  if (validation.role === 'administrator') {
    const { name, email, password, role } = req.body;
    const newUser = await userService.customerRegister({ name, email, password, role });
    
    return res.status(201).json(newUser);
  }

  return res.status(401).json({ message: 'Unauthorized' });

};

const findSellersNames = async (_req, res) => {
  const sellers = await userService.findSellersNames();
  return res.status(200).json(sellers);
};

module.exports = { login, customerRegister, findSellersNames, adminRegister };