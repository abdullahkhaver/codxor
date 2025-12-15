const User = require('../models/user.model');
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const ActivityLog = require('../models/logactivity.model');
const logActivity = require('../utils/logActivity');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .limit(100)
      .select('-password')
      .lean();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    logActivity(
      `🗑️ User "${user.username}" was deleted`,
      req.user.username,
    ).catch(console.error);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true },
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    logActivity(
      `🔧 Admin promoted "${user.username}"`,
      req.user.username,
    ).catch(console.error);
    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    console.error('Error promoting user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.demoteToUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'user' },
      { new: true },
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    logActivity(`🔧 Admin demoted "${user.username}"`, req.user.username).catch(
      console.error,
    );
    res.json({ message: 'User demoted to user role', user });
  } catch (err) {
    console.error('Error demoting user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { banned: true },
      { new: true },
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    logActivity(`🚫 Banned "${user.username}"`, req.user.username).catch(
      console.error,
    );
    res.json({ message: 'User banned', user });
  } catch (err) {
    console.error('Error banning user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { banned: false },
      { new: true },
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    logActivity(`✅ Unbanned "${user.username}"`, req.user.username).catch(
      console.error,
    );
    res.json({ message: 'User unbanned', user });
  } catch (err) {
    console.error('Error unbanning user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalMessages = await Message.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySignups = await User.countDocuments({
      createdAt: { $gte: today },
    });

    res.json({
      totalUsers,
      totalAdmins,
      totalMessages,
      todaySignups,
    });
  } catch (err) {
    console.error('Stats fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password')
      .lean();
    res.json(users);
  } catch (err) {
    console.error('Recent users fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch recent users' });
  }
};

exports.getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    res.json(logs);
  } catch (err) {
    console.error('Activity logs fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch activity logs' });
  }
};

exports.clearActivityLogs = async (req, res) => {
  try {
    await ActivityLog.deleteMany({});
    res.json({ message: 'All activity logs deleted successfully' });
  } catch (err) {
    console.error('Error deleting logs:', err);
    res.status(500).json({ error: 'Failed to delete logs' });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .populate('participants', 'fullName username profilePic')
      .sort({ updatedAt: -1 })
      .lean();
    res.json(conversations);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ createdAt: -1 })
      .lean();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
