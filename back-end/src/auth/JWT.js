const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret_key';

const create = (data) => {
  const token = jwt.sign(
    { data },
    secret,
    { expiresIn: '1d', algorithm: 'HS256' },
  );

  return token;
};

const validate = (token = null) => {
  if (!token) throw new Error('Token not found');

  try {
    const decoded = jwt.verify(token, secret);
    return decoded.data;
  } catch (error) {
    throw new Error('Expired or invalid token');
  }
};

module.exports = { create, validate };