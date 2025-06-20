const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // secure = true in prod
    sameSite: 'None', // allow cookie to be sent between subdomains over HTTPS
    maxAge: 15 * 24 * 60 * 60 * 1000,
    domain: '.itkhaver.com', // allow access from both api.codxor.itkhaver.com and codxor.itkhaver.com
  });
};

module.exports = generateTokenAndSetCookie;
