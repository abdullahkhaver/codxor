const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const controller = require('../controllers/admin.controller');

// User management
router.get('/users', verifyAdmin, controller.getAllUsers);
router.delete('/users/:id', verifyAdmin, controller.deleteUser);
router.put('/users/:id/make-admin', verifyAdmin, controller.promoteToAdmin);
router.put('/users/:id/remove-admin', verifyAdmin, controller.demoteToUser);
router.put('/ban/:userId', verifyAdmin, controller.banUser);
router.put('/unban/:userId', verifyAdmin, controller.unbanUser);

// Stats & logs
router.get('/stats', verifyAdmin, controller.getAdminStats);
router.get('/recent-users', verifyAdmin, controller.getRecentUsers);
router.get('/activity', verifyAdmin, controller.getActivityLogs);
router.delete('/logs', verifyAdmin, controller.clearActivityLogs);

// Conversations & messages
router.get('/conversations', verifyAdmin, controller.getAllConversations);
router.get('/messages', verifyAdmin, controller.getAllMessages);

module.exports = router;
