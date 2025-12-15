import { useEffect, useMemo } from 'react';
import { useSocketContext } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import useConversation from '../../zustand/useConversation';
import { motion } from 'framer-motion';
import { FiCheck, FiCheckCircle , FiShield} from 'react-icons/fi';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Conversation = ({ conversation, lastIdx, collapsed }) => {
  const { selectedConversation, updateConversation, unreadConversations } =
    useConversation();

  const { socket, onlineUsers } = useSocketContext();
  const navigate = useNavigate();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  const isUnread = unreadConversations.has(conversation._id);

  const lastMessage = useMemo(() => {
    if (!conversation.lastMessage)
      return { text: 'No messages yet', seen: false, timestamp: null };
    return {
      text: conversation.lastMessage.text || 'Media message',
      seen: !!conversation.lastMessage.seen,
      timestamp: conversation.lastMessage.createdAt
        ? new Date(conversation.lastMessage.createdAt)
        : null,
    };
  }, [conversation.lastMessage]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message) => {
        if (message.conversationId === conversation._id) {
          updateConversation(conversation._id, {
            ...conversation,
            lastMessage: {
              text: message.text,
              seen: message.seen || false,
              createdAt: message.createdAt || new Date().toISOString(),
            },
          });

          // 👇 Mark as unread if not currently selected
          if (selectedConversation?._id !== conversation._id) {
            useConversation
              .getState()
              .markConversationAsUnread(conversation._id);
          }
        }
      };

      socket.on('newMessage', handleNewMessage);
      return () => socket.off('newMessage', handleNewMessage);
    }
  }, [socket, conversation, selectedConversation, updateConversation]);


  return (
    <motion.div
      whileHover={{ scale: collapsed ? 1 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${!lastIdx ? 'border-b border-gray-700' : ''}`}
    >
      <div
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-700 ${
          collapsed ? 'justify-center' : ''
        }`}
        onClick={() => navigate(`/chat/${conversation.username}`)}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="avatar">
            <div
              className={`rounded-full ${
                collapsed ? 'w-10 h-10' : 'w-12 h-12'
              }`}
            >
              <img
                src={
                  conversation.profilePic ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'
                }
                alt={conversation.fullName || 'User'}
                className="object-cover"
              />
            </div>
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          )}
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-semibold text-white truncate max-w-[140px]">
                  {conversation.fullName || 'Unknown User'}
                </h3>

                {conversation.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-400 text-black shrink-0">
                    <FiShield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>

              {/* Unread Dot */}
              {isUnread && !isSelected && (
                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </div>

            <div className="flex items-center gap-1">
              {lastMessage.seen ? (
                <FiCheckCircle className="text-sky-400 w-3 h-3" />
              ) : lastMessage.text !== 'No messages yet' ? (
                <FiCheck className="text-gray-400 w-3 h-3" />
              ) : null}
              <p
                className={`text-sm truncate ${
                  lastMessage.seen
                    ? 'text-gray-400'
                    : 'text-gray-300 font-medium'
                }`}
              >
                {lastMessage.text}
              </p>
              {lastMessage.timestamp && (
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(lastMessage.timestamp, {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    username: PropTypes.string,
    profilePic: PropTypes.string,
    lastMessage: PropTypes.shape({
      text: PropTypes.string,
      seen: PropTypes.bool,
      createdAt: PropTypes.string,
    }),
  }).isRequired,
  lastIdx: PropTypes.bool.isRequired,
  emoji: PropTypes.string,
  collapsed: PropTypes.bool,
};

export default Conversation;
