// /frontend/src/components/messages/MessageInput.js
import { useState, useRef, useEffect } from 'react';
import { BsSend, BsEmojiSmile, BsPlusCircle } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import useSendMessage from '../../hooks/useSendMessage';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation || loading) return;

    await sendMessage(message, selectedConversation._id);
    socket.emit('sendMessage', {
      conversationId: selectedConversation._id,
      receiverId: selectedConversation._id, // Adjust if receiverId is different
      text: message,
    });
    setMessage('');
    inputRef.current.focus();
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedConversation && socket) {
      socket.emit('markAsSeen', { conversationId: selectedConversation._id });
    }
  }, [selectedConversation, socket]);

  return (
    <div className="relative px-4 pb-4 pt-2 bg-gray-800 border-t border-gray-700">
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            ref={pickerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 ml-4"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
              theme="dark"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-gray-700 rounded-full pl-4 pr-2 py-1">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-sky-400 transition-colors"
            disabled={loading}
          >
            <BsEmojiSmile className="w-5 h-5" />
          </button>

          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 mx-3 py-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            disabled={loading || !selectedConversation}
          />

          <AnimatePresence mode="wait">
            {message ? (
              <motion.button
                key="send"
                type="submit"
                disabled={loading || !selectedConversation}
                className="p-2 rounded-full text-white bg-sky-500 hover:bg-sky-600 transition-colors disabled:opacity-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <IoSend className="w-5 h-5" />
                )}
              </motion.button>
            ) : (
              <motion.button
                key="attach"
                type="button"
                className="text-gray-400 hover:text-sky-400 transition-colors p-2"
                disabled={loading || !selectedConversation}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <BsPlusCircle className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
