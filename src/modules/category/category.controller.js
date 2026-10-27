const Category = require('./category.model');
const ApiError = require('../../utils/ApiError');
const asyncHandler = require('../../utils/asyncHandler');

// POST /api/categories
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name.trim();
  if (Category.findByName(name)) throw new ApiError(400, 'Category name already exists');

  const category = Category.create({
    name,
    description: req.body.description || '',
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, message: 'Category created', data: category });
});

// GET /api/categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = Category.findAll();
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

// GET /api/categories/:id
exports.getCategory = asyncHandler(async (req, res) => {
  const category = Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  res.status(200).json({ success: true, data: category });
});

// PUT /api/categories/:id
exports.updateCategory = asyncHandler(async (req, res) => {
  const existing = Category.findById(req.params.id);
  if (!existing) throw new ApiError(404, 'Category not found');

  const changes = {};
  if (req.body.name !== undefined) {
    const dup = Category.findByName(req.body.name);
    if (dup && dup.id !== existing.id) throw new ApiError(400, 'Category name already exists');
    changes.name = req.body.name.trim();
  }
  if (req.body.description !== undefined) changes.description = req.body.description;

  const category = Category.update(req.params.id, changes);
  res.status(200).json({ success: true, message: 'Category updated', data: category });
});

// DELETE /api/categories/:id
exports.deleteCategory = asyncHandler(async (req, res) => {
  if (!Category.delete(req.params.id)) throw new ApiError(404, 'Category not found');
  res.status(200).json({ success: true, message: 'Category deleted' });
});
