const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const user = new User({ username, email, password, role });
    await user.save(); // your pre-save hook will hash the password

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error('[SIGNUP] Server error:', err.message);
    res.status(500).json({ msg: 'Server error during signup' });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    // ✅ Include role in response
    res.status(200).json({
      token,
      username: user.username,
      role: user.role,
    });

  } catch (err) {
    console.error('[LOGIN] Server error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

