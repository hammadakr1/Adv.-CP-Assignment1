const router = require('express').Router();
const c = require('./course.controller');
const { createRules, updateRules } = require('./course.validation');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');

router.get('/', c.getCourses);
router.get('/:id', c.getCourse);
router.post('/', protect, createRules, validate, c.createCourse);
router.put('/:id', protect, updateRules, validate, c.updateCourse);
router.delete('/:id', protect, c.deleteCourse);

module.exports = router;
