const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { errorHandler } = require('../utils/error');

async function signup(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(errorHandler(409, 'User already exists'));
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hash, role: 'fiend' });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(401, 'Invalid credentials'));

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Signed in successfully',
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
      });
  } catch (error) {
    next(error);
  }
}

function signout(_req, res) {
  res.clearCookie('access_token').status(200).json({ message: 'Signed out successfully' });
}

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return next(errorHandler(404, 'User not found'));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, signin, signout, me };
