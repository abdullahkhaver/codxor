import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
import { motion } from 'framer-motion';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-[#6366f1]' : 'bg-[#2d2f36]';
  const shakeClass = message.shouldShake ? 'animate-shake' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex items-end gap-2 ${fromMe ? 'flex-row-reverse' : ''}`}
      >
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img
              alt="User avatar"
              src={
                profilePic ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'
              }
            />
          </div>
        </div>
        <div
          className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md ${bubbleBgColor} ${shakeClass} text-[#e5e7eb]`}
          >
            {message.message}
          </div>
          <div className="text-xs text-[#9ca3af] mt-1">{formattedTime}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
