const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res, next) => {
  try {
    const { email, password, role, teacherId } = req.body;

    // if student role must include teacherId
    if (role === 'student' && !teacherId) {
      return res.status(400).json({ success: false, message: 'teacherId required for students' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ email, passwordHash, role, teacherId: role === 'student' ? teacherId : undefined });
    await user.save();

    return res.status(201).json({ success: true, message: 'User created' });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role, teacherId: user.teacherId } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
