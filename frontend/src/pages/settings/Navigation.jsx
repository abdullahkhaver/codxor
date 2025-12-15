import { Link } from 'react-router-dom';
import { FiEye, FiEdit, FiLink2, FiArrowLeft, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'view', icon: FiEye, label: 'View Profile' },
    { id: 'edit', icon: FiEdit, label: 'Edit Profile' },
    { id: 'social', icon: FiLink2, label: 'Social Links' },
    { id: 'about', icon: FiInfo, label: 'About' },
  ];

  return (
    <div className="w-full lg:w-72 h-fit lg:h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/30 shadow-xl h-full"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex mb-8 items-center gap-3 text-base font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 px-5 py-3 rounded-xl shadow-md transition-all w-full"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </Link>

        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center w-full gap-4 px-5 py-3 rounded-xl text-base font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-white bg-gradient-to-r from-teal-500/80 to-blue-500/80 shadow-lg shadow-teal-500/20'
                  : 'text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="nav-active-tab"
                  className="absolute left-0 w-1.5 h-8 bg-teal-400 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <tab.icon
                className={`w-5 h-5 flex-shrink-0 ${
                  activeTab === tab.id ? 'text-teal-400' : 'text-gray-400'
                }`}
              />
              <span className="text-left">{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </div>
  );
};

export default Navigation;
