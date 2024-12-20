const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Suuuuuu');
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
}; 