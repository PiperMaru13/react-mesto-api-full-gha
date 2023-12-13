const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenKey = token.replace('Bearer ', '');
  if (!token) {
    return next(new UnauthorizedError('Ошибка токена!'));
  }
  let payload;
  try {
    payload = jwt.verify(tokenKey, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'DEV_SECRET');
  } catch (err) {
    return next(new UnauthorizedError('Ошибка токена!'));
  }
  req.user = payload;
  return next();
};
