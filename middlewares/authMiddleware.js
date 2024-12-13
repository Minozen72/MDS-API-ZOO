const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/db');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token manquant');
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send('Token invalide');
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
