const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/error');

function verifyToken(req, _res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Authentication required'));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (_error) {
    next(errorHandler(401, 'Invalid or expired token'));
  }
}

function allowRoles(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(errorHandler(403, 'Forbidden'));
    }
    next();
  };
}

module.exports = { verifyToken, allowRoles };
