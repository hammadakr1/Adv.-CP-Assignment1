const { body } = require('express-validator');

const levels = ['beginner', 'intermediate', 'advanced'];

exports.createRules = [
  body('title').trim().notEmpty().withMessage('Course title is required'),
  body('description').trim().notEmpty().withMessage('Course description is required'),
  body('price').notEmpty().withMessage('Price is required').bail().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required').bail().isMongoId().withMessage('Category must be a valid ID'),
  body('level').optional().isIn(levels).withMessage(`Level must be one of: ${levels.join(', ')}`),
];

exports.updateRules = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().isMongoId().withMessage('Category must be a valid ID'),
  body('level').optional().isIn(levels).withMessage(`Level must be one of: ${levels.join(', ')}`),
];
