const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');

const jwtSecret = JWT_SECRET || process.env.JWT_SECRET;

// creating a custom middleware for protected route
module.exports = (req, res, next) => {
  const token = req.header('auth-token') || req.header('Bearer') || req.header('token') || req.header('Authorization');
  if (!token) return res.status(401).send(`Access Denied: ${token}`);
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
