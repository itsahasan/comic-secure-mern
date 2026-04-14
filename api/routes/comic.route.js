const express = require('express');
const { body } = require('express-validator');
const {
  listComics,
  getComic,
  createComic,
  updateComic,
  deleteComic,
} = require('../controllers/comic.controller');
const { verifyToken, allowRoles } = require('../middleware/auth.middleware');
const { handleValidation } = require('../middleware/validation.middleware');
const { sanitizeBody } = require('../utils/sanitize');

const router = express.Router();

router.use(verifyToken);

router.get('/', allowRoles('super_admin', 'admin', 'fiend'), listComics);
router.get('/:id', allowRoles('super_admin', 'admin', 'fiend'), getComic);

router.post(
  '/',
  allowRoles('admin'),
  sanitizeBody,
  [
    body('serie').isLength({ min: 1, max: 200 }).withMessage('Serie is required'),
    body('number').optional().isLength({ max: 50 }).withMessage('Number too long'),
    body('title').isLength({ min: 1, max: 200 }).withMessage('Title is required'),
  ],
  handleValidation,
  createComic
);

router.put(
  '/:id',
  allowRoles('admin'),
  sanitizeBody,
  [
    body('serie').optional().isLength({ min: 1, max: 200 }).withMessage('Serie is invalid'),
    body('number').optional().isLength({ max: 50 }).withMessage('Number too long'),
    body('title').optional().isLength({ min: 1, max: 200 }).withMessage('Title is invalid'),
  ],
  handleValidation,
  updateComic
);

router.delete('/:id', allowRoles('admin'), deleteComic);

module.exports = router;
