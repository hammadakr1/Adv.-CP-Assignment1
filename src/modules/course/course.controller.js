const Course = require('./course.model');
const Category = require('../category/category.model');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

// POST /api/courses
exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, instructor, duration, level } = req.body;

  if (!Category.findById(category)) throw new ApiError(404, 'Category not found');

  const course = Course.create({
    title,
    description,
    price: Number(price),
    categoryId: category,
    instructor: instructor || '',
    duration: duration || '',
    level: level || 'beginner',
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, message: 'Course created', data: course });
});

// GET /api/courses?category=<id>&search=<text>
exports.getCourses = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const courses = Course.findAll(
    (c) =>
      (!category || c.categoryId === category) &&
      (!search || c.title.toLowerCase().includes(String(search).toLowerCase()))
  );
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// GET /api/courses/:id
exports.getCourse = asyncHandler(async (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json({ success: true, data: course });
});

// PUT /api/courses/:id
exports.updateCourse = asyncHandler(async (req, res) => {
  if (!Course.findById(req.params.id)) throw new ApiError(404, 'Course not found');

  const { title, description, price, category, instructor, duration, level } = req.body;
  const changes = {};
  if (title !== undefined) changes.title = title;
  if (description !== undefined) changes.description = description;
  if (price !== undefined) changes.price = Number(price);
  if (instructor !== undefined) changes.instructor = instructor;
  if (duration !== undefined) changes.duration = duration;
  if (level !== undefined) changes.level = level;
  if (category !== undefined) {
    if (!Category.findById(category)) throw new ApiError(404, 'Category not found');
    changes.categoryId = category;
  }

  const course = Course.update(req.params.id, changes);
  res.status(200).json({ success: true, message: 'Course updated', data: course });
});

// DELETE /api/courses/:id
exports.deleteCourse = asyncHandler(async (req, res) => {
  if (!Course.delete(req.params.id)) throw new ApiError(404, 'Course not found');
  res.status(200).json({ success: true, message: 'Course deleted' });
});
