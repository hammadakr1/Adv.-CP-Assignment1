const router = require('express').Router();
const { register, login, getMe } = require('./auth.controller');
const { registerRules, loginRules } = require('./auth.validation');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
