const express = require('express');
const {
  getMessages,
  sendMessage,
} = require('../controllers/message.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

module.exports = router;
