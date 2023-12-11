require("dotenv").config();
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
//const expiration = '2h';

const signToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username
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

//module.exports = {
  // function for our authenticated routes
  //authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    //let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    //if (req.headers.authorization) {
      //token = token.split(' ').pop().trim();
    //}

    //if (!token) {
      //return req;
    //}

    // verify token and get user data out of it
    //try {
      //const { data } = jwt.verify(token, secret, { maxAge: expiration });
      //req.user = data;
    //} catch {
     // console.log('Invalid token');
   // }

    //return req;
 //},
  //signToken: function ({ username, email, _id }) {
  //  const payload = { username, email, _id };

    //return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  //},
//};
