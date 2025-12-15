import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiMail,
  FiLink,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiUser,
} from 'react-icons/fi';
import { format } from 'date-fns';
import Skeleton from './Skeleton';
import SERVER_URL from '../../utils/SERVER_URL';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/api/users/${username}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  const getGenderEmoji = () => {
    switch (user?.gender) {
      case 'male':
        return '♂️';
      case 'female':
        return '♀️';
      default:
        return '';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <FiTwitter className="text-[#0ea5e9]" />;
      case 'github':
        return <FiGithub className="text-[#e5e7eb]" />;
      case 'linkedin':
        return <FiLinkedin className="text-[#6366f1]" />;
      default:
        return <FiLink className="text-[#8b5cf6]" />;
    }
  };

  const validateLink = (link) => {
    try {
      const url = new URL(link);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0f1117] p-4"
    >
      <div className="w-full max-w-6xl h-[80vh] bg-[#1a1d24] backdrop-blur-lg rounded-2xl shadow-2xl border border-[#2d2f36] flex overflow-hidden">
        {/* Left Side - Profile Card */}
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
              {user.fullName} {getGenderEmoji()}
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

        {/* Right Side - Details */}
        <div className="w-2/3 p-8 overflow-y-auto custom-scroll">
          {user.bio && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[#e5e7eb] mb-3 border-b border-[#2d2f36] pb-2">
                About
              </h2>
              <p className="text-[#e5e7eb]">{user.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mb-8">
            {user.email && (
              <div className="bg-[#1a1d24]/40 p-4 rounded-xl border border-[#2d2f36]">
                <div className="flex items-center gap-2 text-[#9ca3af] mb-2">
                  <FiMail />
                  <h2 className="text-sm font-medium">Email</h2>
                </div>
                <a
                  href={`mailto:${user.email}`}
                  className="text-[#6366f1] hover:text-[#0ea5e9] transition-colors break-all"
                >
                  {user.email}
                </a>
              </div>
            )}

            {user.portfolio && (
              <div className="bg-[#1a1d24]/40 p-4 rounded-xl border border-[#2d2f36]">
                <div className="flex items-center gap-2 text-[#9ca3af] mb-2">
                  <FiLink />
                  <h2 className="text-sm font-medium">Portfolio</h2>
                </div>
                {validateLink(user.portfolio) ? (
                  <a
                    href={user.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366f1] hover:text-[#0ea5e9] transition-colors break-all"
                  >
                    {user.portfolio}
                  </a>
                ) : (
                  <span className="text-[#9ca3af] italic">Invalid URL</span>
                )}
              </div>
            )}
          </div>

          {user.socials && Object.keys(user.socials).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-[#e5e7eb] mb-4 border-b border-[#2d2f36] pb-2">
                Social Links
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(user.socials).map(([platform, link]) => (
                  <div
                    key={platform}
                    className="bg-[#1a1d24]/40 p-3 rounded-lg border border-[#2d2f36] hover:border-[#6366f1] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{getPlatformIcon(platform)}</div>
                      <div className="truncate">
                        {validateLink(link) ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e5e7eb] hover:text-[#6366f1] transition-colors"
                            title={link}
                          >
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                          </a>
                        ) : (
                          <span className="text-[#9ca3af] italic" title={link}>
                            Invalid {platform} link
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const getDefaultAvatar = (gender) => {
  return gender === 'female'
    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s'
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&s';
};

const ProfileSkeleton = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-[#0f1117] p-4">
    <div className="w-full max-w-6xl h-[80vh] bg-[#1a1d24] backdrop-blur-lg rounded-2xl shadow-xl border border-[#2d2f36] flex">
      <div className="w-1/3 flex flex-col items-center justify-center p-8 border-r border-[#2d2f36]">
        <Skeleton className="w-32 h-32 rounded-full bg-[#2d2f36]" />
        <Skeleton className="h-6 w-48 bg-[#2d2f36] mt-4" />
        <Skeleton className="h-4 w-32 bg-[#2d2f36] mt-2" />
        <Skeleton className="h-8 w-40 rounded-full bg-[#2d2f36] mt-6" />
      </div>
      <div className="w-2/3 p-8">
        <Skeleton className="h-6 w-32 bg-[#2d2f36] mb-6" />
        <Skeleton className="h-24 w-full bg-[#2d2f36] rounded-xl mb-8" />
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-20 bg-[#2d2f36] rounded-xl" />
          <Skeleton className="h-20 bg-[#2d2f36] rounded-xl" />
        </div>
        <Skeleton className="h-6 w-32 bg-[#2d2f36] mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
          <Skeleton className="h-16 bg-[#2d2f36] rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-screen h-screen flex items-center justify-center bg-[#0f1117]"
  >
    <div className="text-center max-w-md bg-[#1a1d24] backdrop-blur-lg p-8 rounded-2xl border border-[#2d2f36]">
      <div className="text-2xl font-bold bg-gradient-to-r from-[#ef4444] to-[#8b5cf6] bg-clip-text text-transparent mb-3">
        Profile Not Found
      </div>
      <p className="text-[#9ca3af] mb-6">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#6366f1] rounded-full text-[#e5e7eb] font-medium transition-all shadow-lg"
      >
        Try Again
      </button>
    </div>
  </motion.div>
);

export default UserProfile;


