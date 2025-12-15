const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

const getSortedConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({ participants: userId })
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
      })
      .populate({
        path: 'participants',
        select: '_id fullName username profilePic',
      });

    const formatted = conversations
      .map((conv) => {
        const otherUser = conv.participants.find(
          (p) => p._id.toString() !== userId.toString(),
        );

        const lastMsg = conv.messages[0];
        return {
          _id: conv._id,
          ...otherUser._doc,
          lastMessage: lastMsg || null,
        };
      })
      .sort((a, b) => {
        if (!a.lastMessage || !b.lastMessage) return 0;

        // Prioritize senders who messaged us
        const aSentByOther =
          a.lastMessage.senderId?.toString() !== userId.toString();
        const bSentByOther =
          b.lastMessage.senderId?.toString() !== userId.toString();

        if (aSentByOther && !bSentByOther) return -1;
        if (!aSentByOther && bSentByOther) return 1;

        return (
          new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
        );
      });

    res.status(200).json(formatted);
  } catch (error) {
    console.log('Get conversations error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSortedConversations };
