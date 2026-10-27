const { body } = require('express-validator');

exports.createRules = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('description').optional().isString().withMessage('Description must be text'),
];

exports.updateRules = [
  body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty'),
  body('description').optional().isString().withMessage('Description must be text'),
];
