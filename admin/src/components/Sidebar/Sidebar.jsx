import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiLogOut,
  FiHome,
  FiUsers,
  FiSettings,
  FiMessageSquare,
  FiPieChart,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('chat-user');
    navigate('/');
  };

  const navItems = [
    {
      path: '/dashboard',
      icon: <FiHome size={20} />,
      label: 'Dashboard',
      exact: true,
    },
    {
      path: '/dashboard/users',
      icon: <FiUsers size={20} />,
      label: 'User Management',
      subItems: [
        { path: '/dashboard/users/', label: 'All Users' },
        // { path: '/dashboard/users/roles', label: 'Roles & Permissions' },
        // { path: '/dashboard/users/activity', label: 'User Activity' },
      ],
    },
    {
      path: '/dashboard/conversations',
      icon: <FiMessageSquare size={20} />,
      label: 'Conversations',
      badge: 5,
    },
    // {
    //   path: '/dashboard/analytics',
    //   icon: <FiPieChart size={20} />,
    //   label: 'Analytics',
    //   comingSoon: true,
    // },
    // {
    //   path: '/dashboard/settings',
    //   icon: <FiSettings size={20} />,
    //   label: 'Settings',
    //   subItems: [
    //     { path: '/dashboard/settings/general', label: 'General' },
    //     { path: '/dashboard/settings/security', label: 'Security' },
    //     { path: '/dashboard/settings/notifications', label: 'Notifications' },
    //   ],
    // },
  ];

  const toggleSubmenu = (path) => {
    setActiveSubmenu(activeSubmenu === path ? null : path);
  };

  const isActive = (path, exact = false) => {
    return exact
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`bg-gray-900 border-r border-gray-800 flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo/Brand */}
      <div
        className={`p-4 ${
          collapsed
            ? 'flex justify-center'
            : 'flex items-center justify-between'
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <img
              src="/codxor.png" // Change this path to your logo
              alt="Logo"
              className="h-10 w-10 object-contain rounded-lg bg-white p-1"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              CX Control
            </h1>
          </div>
        )}

        {collapsed && (
          <img
            src="/codxor.png" // Same logo here (or use an icon version)
            alt="Logo"
            className="h-10 w-10 object-contain rounded-lg bg-white p-1"
          />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
        >
          {collapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 ">
        {navItems.map((item) => (
          <div key={item.path} className="px-2">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.path)}
                  className={`flex items-center justify-between w-full text-sm font-medium px-4 py-3 rounded-lg transition-colors mb-1 ${
                    isActive(item.path)
                      ? 'bg-blue-900/30 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${
                        isActive(item.path) ? 'text-blue-400' : 'text-gray-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && item.label}
                  </div>
                  {!collapsed && (
                    <FiChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${
                        activeSubmenu === item.path ? 'transform rotate-90' : ''
                      }`}
                    />
                  )}
                </button>

                {!collapsed && activeSubmenu === item.path && (
                  <div className="ml-4 pl-6 border-l border-gray-700 space-y-1 mt-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block text-sm px-3 py-2 rounded transition-colors ${
                          location.pathname === subItem.path
                            ? 'text-blue-400 bg-blue-900/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center justify-between text-sm font-medium px-4 py-3 rounded-lg transition-colors mb-1 ${
                  isActive(item.path, item.exact)
                    ? 'bg-blue-900/30 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      isActive(item.path, item.exact)
                        ? 'text-blue-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && item.label}
                </div>
                {!collapsed && item.badge && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                {!collapsed && item.comingSoon && (
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-sm font-medium text-red-400 hover:text-red-300 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiLogOut size={20} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

