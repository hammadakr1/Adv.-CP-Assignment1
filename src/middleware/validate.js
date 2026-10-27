const { validationResult } = require('express-validator');

// Returns 400 Bad Request when validation rules fail
module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
  return res.status(400).json({ success: false, message: 'Validation failed', errors });
};
