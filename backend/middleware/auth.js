const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ message: 'Account has been deactivated.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token.' });
  }
};

module.exports = { protect };
