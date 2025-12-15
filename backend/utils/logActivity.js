const ActivityLog = require('../models/logactivity.model');

const logActivity = async (message, adminUsername) => {
  try {
    const finalMessage = adminUsername
      ? `${message} (by ${adminUsername})`
      : message;
    await ActivityLog.create({ message: finalMessage });
  } catch (err) {
    console.error('Failed to log activity:', err.message);
  }
};

module.exports = logActivity;
