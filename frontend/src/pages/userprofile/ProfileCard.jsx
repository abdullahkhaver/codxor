import { motion } from 'framer-motion';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';

const getDefaultAvatar = (gender) =>
  gender === 'female'
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s';

const getGenderEmoji = (gender) => {
  switch (gender) {
    case 'male':
      return '♂️';
    case 'female':
      return '♀️';
    default:
      return '';
  }
};

const ProfileCard = ({ user }) => (
  <div className="w-1/3 flex flex-col items-center justify-center p-8 border-r border-[#2d2f36]">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mb-6 relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-full blur-lg opacity-25"></div>
      <img
        src={user.profilePic || getDefaultAvatar(user.gender)}
        alt={user.fullName}
        className="relative w-32 h-32 rounded-full border-4 border-[#2d2f36] object-cover bg-[#1a1d24]"
        onError={(e) => {
          e.target.src = getDefaultAvatar(user.gender);
        }}
      />
    </motion.div>

    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">
        {user.fullName} {getGenderEmoji(user.gender)}
      </h1>
      <p className="text-[#9ca3af] mt-1">@{user.username}</p>
      {user.role === 'admin' && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#ef4444] text-[#e5e7eb] font-medium">
          <FiUser className="w-3 h-3" />
          Admin
        </span>
      )}
    </div>

    <div className="flex items-center text-[#9ca3af] text-sm bg-[#1a1d24]/50 px-4 py-2 rounded-full mb-6">
      <FiCalendar className="mr-2" />
      <span>Joined {format(new Date(user.createdAt), 'MMM yyyy')}</span>
    </div>

    <a
      href={`/chat/${user.username}`}
      className="px-5 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-[#e5e7eb] font-semibold rounded-full shadow-md hover:from-[#0ea5e9] hover:to-[#6366f1] transition-all"
    >
      💬 Chat Now
    </a>
  </div>
);

export default ProfileCard;
