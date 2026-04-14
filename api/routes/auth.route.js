const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { signup, signin, signout, me } = require('../controllers/auth.controller');
const { handleValidation } = require('../middleware/validation.middleware');
const { sanitizeBody } = require('../utils/sanitize');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many auth attempts, please try again later' },
});

router.post(
  '/signup',
  authLimiter,
  sanitizeBody,
  [
    body('username').isLength({ min: 3, max: 30 }).withMessage('Username must be 3 to 30 characters'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain a lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain a number'),
  ],
  handleValidation,
  signup
);

router.post(
  '/signin',
  authLimiter,
  sanitizeBody,
  [body('email').isEmail().withMessage('Valid email is required'), body('password').notEmpty().withMessage('Password is required')],
  handleValidation,
  signin
);

router.post('/signout', signout);
router.get('/me', verifyToken, me);

module.exports = router;
