const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const ActivityLog = require('../models/logactivity.model');
const generateTokenAndSetCookie = require('../utils/generateToken');

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://t3.ftcdn.net/jpg/05/61/46/90/360_F_561469055_MIvaD68qP2Y66hfVAa4tX6XskuJQe3nG.jpg`;
    const girlProfilePic = `https://t3.ftcdn.net/jpg/05/61/46/90/360_F_561469055_MIvaD68qP2Y66hfVAa4tX6XskuJQe3nG.jpg`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    const ip = req.clientIp || req.ip || 'unknown IP';
    const device = req.headers['user-agent'] || 'unknown device';

    await ActivityLog.create({
      message: `New user "${newUser.username}" signed up from ${ip} using ${device}`,
    });

    generateTokenAndSetCookie(newUser._id, res, newUser.role);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error('Error in signup controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (user.banned) {
      return res.status(403).json({ error: 'You are banned from this app.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Incorrect password' });

    generateTokenAndSetCookie(user._id, res, user.role);

    const ip = req.clientIp || req.ip || 'unknown IP';
    const device = req.headers['user-agent'] || 'unknown device';

    await ActivityLog.create({
      message: `🔓 User "${user.username}" logged in from ${ip} using ${device}`,
    });

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      role: user.role,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
