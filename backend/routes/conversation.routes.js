const express = require('express');
const {
  getSortedConversations,
} = require('../controllers/conversation.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router();

router.get('/', protectRoute, getSortedConversations);

module.exports = router;
