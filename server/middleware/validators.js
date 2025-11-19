const { body, validationResult } = require('express-validator');

const signupValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').isIn(['student','teacher']).withMessage('Role must be student or teacher'),
];

const loginValidator = [
  body('email').isEmail(),
  body('password').exists()
];

const taskCreateValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('progress').optional().isIn(['not-started','in-progress','completed'])
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array().map(e => e.msg).join(', ') });
  }
  next();
}

module.exports = {
  signupValidator,
  loginValidator,
  taskCreateValidator,
  handleValidationErrors
};
