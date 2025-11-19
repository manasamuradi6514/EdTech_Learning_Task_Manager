const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { signupValidator, loginValidator, handleValidationErrors } = require('../middleware/validators');

router.post('/signup', signupValidator, handleValidationErrors, signup);
router.post('/login', loginValidator, handleValidationErrors, login);

module.exports = router;
