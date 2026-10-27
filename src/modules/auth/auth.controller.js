const jwt = require('jsonwebtoken');
const User = require('./user.model');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (User.findByEmail(email)) throw new ApiError(400, 'Email already registered');

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token: signToken(user.id),
    user: User.toPublic(user),
  });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user || !(await User.matchPassword(user, password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: signToken(user.id),
    user: User.toPublic(user),
  });
});

// GET /api/auth/me  (protected)
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
