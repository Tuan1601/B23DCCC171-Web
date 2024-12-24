const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  
  if (!token) {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc không được cung cấp.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
    req.user = decoded;  
    next();  
  });
};

module.exports = authMiddleware;
