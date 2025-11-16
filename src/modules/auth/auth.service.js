const User = require('./auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};