// frontend/src/components/sidebar/Conversations.jsx
import { useEffect } from 'react';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../skeletons/conversationSkeleton';
import useConversation from '../../zustand/useConversation';

const Conversations = ({ collapsed }) => {
  const { loading, conversations } = useGetConversations();
  const { setConversations } = useConversation();

  const chatbot = {
    _id: 'chatbot-1234',
    fullName: 'Kodu Ai',
    username: 'koduai',
    profilePic: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
    lastMessage: {
      text: 'Comming Soon',
      seen: true,
      createdAt: new Date().toISOString(),
    },
  };

  useEffect(() => {
    if (!loading && conversations.length) {
      setConversations(conversations);
    }
  }, [conversations, loading, setConversations]);

  return (
    <div className="flex-1 cursor-pointer">
      {loading ? (
        <div className="space-y-3 px-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-16 rounded-lg ${collapsed ? 'w-12 mx-auto' : ''}`}
            />
          ))}
        </div>
      ) : (
        <AnimatePresence>
          {/* 🔗 Always show the CodXor Bot first */}
          <motion.div
            key={chatbot._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Conversation
              conversation={chatbot}
              lastIdx={false}
              collapsed={collapsed}
            />
          </motion.div>

          {conversations.length
            ? conversations.map((conversation, idx) => (
                <motion.div
                  key={conversation._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Conversation
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                    collapsed={collapsed}
                  />
                </motion.div>
              ))
            : !collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-400 p-4"
                >
                  No conversations yet
                </motion.div>
              )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Conversations;
