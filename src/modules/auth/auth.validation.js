const { body } = require('express-validator');

exports.registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.loginRules = [
  body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
