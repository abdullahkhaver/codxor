import { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import Message from './Message';
import useListenMessages from '../../hooks/useListenMessages';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
      <AnimatePresence>
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

        {!loading &&
          messages.length > 0 &&
          messages.map((message, idx) => (
            <div
              key={message._id}
              ref={idx === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))}

        {!loading && messages.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#9ca3af] py-8"
          >
            Send a message to start the conversation
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
