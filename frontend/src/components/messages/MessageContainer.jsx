// src/components/messages/MessageContainer.jsx

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiMessages } from 'react-icons/ti';
import { IoIosArrowBack } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const containerRef = useRef(null);
  const isOnline =
    selectedConversation && onlineUsers.includes(selectedConversation._id);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 bg-[#1a1d24] border-l border-[#2d2f36] relative"
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Chat Header */}
          <div className="bg-[#1a1d24] px-4 py-3 flex items-center justify-between border-b border-[#2d2f36] sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        selectedConversation.profilePic ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'
                      }
                      alt={selectedConversation.fullName}
                      className="object-cover"
                    />
                  </div>
                </div>
                {isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22c55e] rounded-full border-2 border-[#1a1d24]" />
                )}
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="font-semibold text-[#e5e7eb] break-words">
                    {selectedConversation.fullName}
                  </h2>

                  {selectedConversation.role === 'admin' && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-400 text-black">
                      <FiUser className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs font-medium ${
                    isOnline ? 'text-[#22c55e]' : 'text-[#9ca3af]'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/${selectedConversation.username}`)}
              className="text-[#9ca3af] hover:text-[#0ea5e9] transition-colors"
              title="View Profile"
            >
              <FiUser size={20} />
            </button>
          </div>

          {/* Messages */}
          {/* <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar"> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full min-h-0 overflow-y-auto px-4 py-2"
          >
            <div className="flex-1 min-h-0 overflow-hidden">
              <motion.div className="h-full min-h-0 overflow-y-auto px-4 py-2">
                <Messages />
              </motion.div>
            </div>
          </motion.div>
          {/* </div> */}

          {/* Message Input */}
          <div className="sticky bottom-0 bg-[#1a1d24] border-t border-[#2d2f36]">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#1a1d24]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="px-4 text-center max-w-md flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          className="p-4 rounded-full bg-[#2d2f36]"
        >
          <TiMessages className="text-5xl text-[#6366f1]" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[#e5e7eb]">
          Welcome, {authUser.fullName}
        </h3>
        <p className="text-[#9ca3af]">
          Select a conversation to start chatting or search for users to connect
          with
        </p>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-4 text-[#6366f1] flex items-center"
        >
          <IoIosArrowBack className="mr-1" />
          <span>Choose someone to message</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MessageContainer;
