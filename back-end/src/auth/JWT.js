const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const create = (data) => {
  const token = jwt.sign(
    { data },
    secret,
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  return token;
};

const validate = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new Error('Token not found');

  try {
    const decoded = jwt.verify(token, secret);
    req.data = decoded.data;
    next();
  } catch (error) {
    throw new Error('Expired or invalid token');
  }
};

module.exports = { create, validate };