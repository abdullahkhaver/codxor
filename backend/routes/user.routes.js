// backend/routes/user.routes.js
const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const {
  getUsersForSidebar,
  getUserByUsername,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/user.controller');

const upload = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.get('/:username', getUserByUsername);
router.put('/update', protectRoute, updateUserProfile);
router.put(
  '/update-avatar',
  protectRoute,
  upload.single('avatar'),
  updateUserAvatar,
);

module.exports = router;
