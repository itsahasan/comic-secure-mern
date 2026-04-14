const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { errorHandler } = require('../utils/error');

async function createUser(req, res, next) {
  try {
    const { username, email, password, role } = req.body;
    const creatorRole = req.user.role;

    if (creatorRole === 'super_admin' && role !== 'admin') {
      return next(errorHandler(403, 'Super admin can create only admin users'));
    }

    if (creatorRole === 'admin' && role === 'super_admin') {
      return next(errorHandler(403, 'Admin cannot create super admin users'));
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(errorHandler(409, 'User already exists'));
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hash, role });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

async function listUsers(_req, res, next) {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser, listUsers };
