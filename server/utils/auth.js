const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server');

const secret = process.env.JWT_SECRET;

const signToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign({ data: payload }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

module.exports = { signToken, verifyToken };
