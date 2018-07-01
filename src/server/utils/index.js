const jwt = require('jsonwebtoken');

const signToken = str => new Promise((resolve) => {
  resolve(jwt.sign({ apiKey: str }, process.env.JWT_KEY));
});
const verifyJwt = (req) => {
  let token;
  if (req.query && req.query.hasOwnProperty('access_token')) {
    token = req.query.access_token;
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) reject('401: User is not authenticated');

      resolve(decoded);
    });
  });
};
module.exports = { signToken, verifyJwt };