const jwt = require('jsonwebtoken');

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
