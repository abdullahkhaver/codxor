const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiResponse = require('../utils/apiResponse');

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json(
          ApiResponse.unauthorized('Unauthorized - User token not provided'),
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json(ApiResponse.unauthorized('Unauthorized - Invalid token'));
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json(ApiResponse.notfound('User not found'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message);
    return res
      .status(500)
      .json(ApiResponse.internalservererror('Internal Server Error'));
  }
};

module.exports = protectRoute;
