import { useState, useEffect, useRef } from 'react';
import useAdminLogout from '../../hooks/useAdminLogout.js';
import { FiLogOut, FiSettings, FiChevronDown, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAdminLogout();
  const dropdownRef = useRef();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('chat-user');
    if (storedUser) {
      setAdminData(JSON.parse(storedUser));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          XorCod Control Panel
        </h1>
      </div>

      {adminData && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={
                adminData?.profilePic ||
                'https://res.cloudinary.com/djzlld9cb/image/upload/v1750507948/chat-app/avatars/zeqk4wtwfebpj8cymhqe.png'
              }
              alt="admin avatar"
              className="w-9 h-9 rounded-full border-2 border-blue-500 cursor-pointer object-cover"
            />
            <FiChevronDown
              className={`transition-transform duration-200 ${
                dropdownOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-700 animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium">{adminData.username}</p>
                <p className="text-xs text-gray-400 truncate">{adminData.email || 'Admin User'}</p>
              </div>

              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                >
                  <FiUser className="mr-3" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                >
                  <FiSettings className="mr-3" />
                  Settings
                </a>
              </div>

              <div className="border-t border-gray-700">
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors text-red-400"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
