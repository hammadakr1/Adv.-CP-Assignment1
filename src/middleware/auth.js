const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// Protects routes: requires header  Authorization: Bearer <token>
exports.protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authorized, token missing');
  }
  const token = header.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = User.findById(decoded.id);
  if (!user) throw new ApiError(401, 'User no longer exists');

  req.user = User.toPublic(user);
  next();
});
