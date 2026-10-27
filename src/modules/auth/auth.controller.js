const jwt = require('jsonwebtoken');
const User = require('./user.model');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const userResponse = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, 'Email already registered');

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token: signToken(user._id),
    user: userResponse(user),
  });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: signToken(user._id),
    user: userResponse(user),
  });
});

// GET /api/auth/me  (protected)
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: userResponse(req.user) });
});
