// =============Production
// const jwt = require('jsonwebtoken');

// const generateTokenAndSetCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '15d',
//   });

//   res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development', // secure = true in prod
//     sameSite: 'None',
//     maxAge: 15 * 24 * 60 * 60 * 1000,
//     domain: '.itkhaver.com',
//   });
// };

// module.exports = generateTokenAndSetCookie;

// ==============Development
const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks
    sameSite: 'strict', // prevent CSRF attacks
    secure: process.env.NODE_ENV !== 'development',
  });
};

module.exports = generateTokenAndSetCookie;
