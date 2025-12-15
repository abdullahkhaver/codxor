import { useState, useEffect } from 'react';
import {
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 640) setIsCollapsed(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      className="flex flex-col h-full bg-[#1a1d24] border-r border-[#2d2f36] shadow-inner text-[#e5e7eb]"
      initial={{ width: 320 }}
      animate={{ width: isCollapsed ? 80 : 320 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#2d2f36]">
        {!isCollapsed && (
          <motion.h2
            className="text-xl font-semibold text-[#e5e7eb]"
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            CodXor
          </motion.h2>
        )}
        <button
          onClick={toggleCollapse}
          className={`p-2 rounded-lg hover:bg-[#2d2f36] text-[#9ca3af] hover:text-[#0ea5e9] transition-colors duration-200 ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            isMobile ? (
              <FiMenu size={20} />
            ) : (
              <FiChevronRight size={20} />
            )
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <motion.div
          className="px-4 pt-4 pb-2"
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <SearchInput />
        </motion.div>
      )}

      {/* Divider */}
      {!isCollapsed && <div className="border-t border-[#2d2f36] mx-4 my-2" />}

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar">
        <Conversations collapsed={isCollapsed} />
      </div>

      {/* Footer */}
      <div className="border-t border-[#2d2f36] mx-4 mb-2" />
      <div
        className={`px-4 pb-4 flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <button
          onClick={() => navigate('/settings')}
          className={`flex items-center gap-2 text-[#9ca3af] hover:text-[#0ea5e9] transition-all duration-200 ${
            isCollapsed ? 'p-2' : ''
          }`}
          aria-label="Settings"
        >
          <FiSettings className="text-xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              Settings
            </motion.span>
          )}
        </button>

        {!isCollapsed && <LogoutButton />}
      </div>
    </motion.div>
  );
};

export default Sidebar;
