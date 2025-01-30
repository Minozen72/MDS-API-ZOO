const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    var token = req.headers.authorization;
    const tokenParts = token.split(' ');
    token = tokenParts[1];
    console.log("token",token);

    if (!token) {
      return res.status(401).json({ error: 'Token manquant' });
    }
    try {
      const decodedToken = jwt.verify(token, '1234567890');
      const userId = decodedToken.userId;
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide : ' + error });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token invalide : ' + error });
  }
};
