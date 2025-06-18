const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const {
  getUsersForSidebar,
  getUserByUsername,
  updateUserProfile,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.get('/:username', getUserByUsername);
router.put('/update', protectRoute, updateUserProfile);

module.exports = router;
