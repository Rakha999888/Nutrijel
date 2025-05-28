const jwt = require('@hapi/jwt');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.token.generate(
    {
      aud: 'urn:audience:nutricheck',
      iss: 'urn:issuer:nutricheck',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    },
    {
      key: process.env.JWT_SECRET || 'your-secret-key',
      algorithm: 'HS256'
    },
    {
      ttlSec: 24 * 60 * 60 // 24 jam
    }
  );
};

const validateToken = async (decoded, request, h) => {
  return { isValid: true };
};

module.exports = {
  generateToken,
  validateToken
}; 