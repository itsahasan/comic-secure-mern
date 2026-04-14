const sanitizeHtml = require('sanitize-html');

function sanitizeText(value) {
  if (typeof value !== 'string') return value;
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();
}

function sanitizeBody(req, _res, next) {
  if (!req.body || typeof req.body !== 'object') return next();

  for (const key of Object.keys(req.body)) {
    if (key.includes('$') || key.includes('.')) {
      delete req.body[key];
      continue;
    }

    req.body[key] = sanitizeText(req.body[key]);
  }

  next();
}

module.exports = { sanitizeBody, sanitizeText };
