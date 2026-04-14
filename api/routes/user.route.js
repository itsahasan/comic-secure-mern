const express = require('express');
const { body } = require('express-validator');
const { createUser, listUsers } = require('../controllers/user.controller');
const { verifyToken, allowRoles } = require('../middleware/auth.middleware');
const { handleValidation } = require('../middleware/validation.middleware');
const { sanitizeBody } = require('../utils/sanitize');

const router = express.Router();

router.use(verifyToken);

router.get('/', allowRoles('super_admin', 'admin'), listUsers);

router.post(
  '/',
  allowRoles('super_admin', 'admin'),
  sanitizeBody,
  [
    body('username').isLength({ min: 3, max: 30 }).withMessage('Username must be 3 to 30 characters'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').isIn(['admin', 'fiend']).withMessage('Role must be admin or fiend'),
  ],
  handleValidation,
  createUser
);

module.exports = router;
