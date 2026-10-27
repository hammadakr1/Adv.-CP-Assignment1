const router = require('express').Router();
const c = require('./category.controller');
const { createRules, updateRules } = require('./category.validation');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');

router.get('/', c.getCategories);
router.get('/:id', c.getCategory);
router.post('/', protect, createRules, validate, c.createCategory);
router.put('/:id', protect, updateRules, validate, c.updateCategory);
router.delete('/:id', protect, c.deleteCategory);

module.exports = router;
