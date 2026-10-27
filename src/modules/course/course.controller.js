const Course = require('./course.model');
const Category = require('../category/category.model');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

// POST /api/courses
exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, instructor, duration, level } = req.body;

  const cat = await Category.findById(category);
  if (!cat) throw new ApiError(404, 'Category not found');

  const course = await Course.create({
    title, description, price, category, instructor, duration, level, createdBy: req.user._id,
  });
  res.status(201).json({ success: true, message: 'Course created', data: course });
});

// GET /api/courses?category=<id>&search=<text>
exports.getCourses = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

  const courses = await Course.find(filter).populate('category', 'name').sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// GET /api/courses/:id
exports.getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('category', 'name');
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json({ success: true, data: course });
});

// PUT /api/courses/:id
exports.updateCourse = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const cat = await Category.findById(req.body.category);
    if (!cat) throw new ApiError(404, 'Category not found');
  }
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json({ success: true, message: 'Course updated', data: course });
});

// DELETE /api/courses/:id
exports.deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json({ success: true, message: 'Course deleted' });
});
