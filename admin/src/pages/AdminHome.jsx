import { useState, useEffect } from 'react';
import {
  FiUsers,
  FiUserCheck,
  FiSend,
  FiUserPlus,
  FiLoader,
  FiClock,
  FiTrash2,
  FiAlertCircle,
  FiActivity,
  FiRefreshCw,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import SERVER_URL from '../utils/SERVER_URL';
import StatCard from '../components/StatCard';
import RecentUsersTable from '../components/RecentUsersTable';
import ActivityLogs from '../components/ActivityLogs';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalMessages: 0,
    todaySignups: 0,
    activeToday: 0,
    issuesReported: 0,
  });
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isDeletingLogs, setIsDeletingLogs] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('chat-user');
    if (storedUser) {
      setAdminData(JSON.parse(storedUser));
    }
  }, []);

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [statsRes, recentRes, activityRes] = await Promise.all([
        fetch(`${SERVER_URL}/api/admin/stats`, { credentials: 'include' }),
        fetch(`${SERVER_URL}/api/admin/recent-users`, {
          credentials: 'include',
        }),
        fetch(`${SERVER_URL}/api/admin/activity`, { credentials: 'include' }),
      ]);

      const [statsData, recentData, activityData] = await Promise.all([
        statsRes.json(),
        recentRes.json(),
        activityRes.json(),
      ]);

      if (!statsRes.ok || !recentRes.ok || !activityRes.ok)
        throw new Error('Failed to load dashboard data');

      setStats(statsData);
      setRecentUsers(recentData);
      setActivity(activityData);
    } catch (err) {
      toast.error(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleDeleteLogs = async () => {
    if (!window.confirm('Delete all activity logs?')) return;

    try {
      setIsDeletingLogs(true);
      const res = await fetch(`${SERVER_URL}/api/admin/logs`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message || 'Logs cleared');
      setActivity([]);
    } catch (err) {
      toast.error(err.message || 'Failed to delete logs');
    } finally {
      setIsDeletingLogs(false);
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-3xl font-bold">
          Welcome back,{' '}
          <span className="text-blue-400">
            {adminData?.fullName || adminData?.username || 'Admin'}
          </span>{' '}
          👋
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 text-sm">
            Last login: {new Date().toLocaleString()}
          </p>
          <button
            onClick={refreshAll}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-blue-500 text-blue-300 hover:bg-blue-800 transition"
          >
            <FiRefreshCw className="text-blue-400" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
          <FiLoader className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <StatCard
            icon={<FiUsers />}
            label="Total Users"
            value={stats.totalUsers}
            change="+12% this week"
            bgColor="bg-blue-900/30"
          />
          <StatCard
            icon={<FiUserCheck />}
            label="Administrators"
            value={stats.totalAdmins}
            change="+2 this month"
            bgColor="bg-green-900/30"
          />
          <StatCard
            icon={<FiSend />}
            label="Messages Sent"
            value={stats.totalMessages}
            change="+24% today"
            bgColor="bg-purple-900/30"
          />
          <StatCard
            icon={<FiUserPlus />}
            label="Today's Signups"
            value={stats.todaySignups}
            change="+3 from yesterday"
            bgColor="bg-yellow-900/30"
          />
          <StatCard
            icon={<FiActivity />}
            label="Active Today"
            value={stats.activeToday}
            change="+8% from yesterday"
            bgColor="bg-red-900/30"
          />
          <StatCard
            icon={<FiAlertCircle />}
            label="Issues Reported"
            value={stats.issuesReported}
            change="-2 from last week"
            bgColor="bg-orange-900/30"
          />
        </div>
      )}

      {/* Recent Users and Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiUsers className="text-blue-400" />
              Recent Signups
            </h2>
            <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">
              Last 5 days
            </span>
          </div>
          <RecentUsersTable users={recentUsers} />
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiClock className="text-purple-400" />
              System Activity
            </h2>
            <button
              onClick={handleDeleteLogs}
              disabled={isDeletingLogs || activity.length === 0}
              className="flex items-center gap-1 text-xs bg-red-900/50 hover:bg-red-900/70 text-red-400 px-3 py-1.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeletingLogs ? (
                <>
                  <FiLoader className="animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <FiTrash2 size={14} />
                  Clear Logs
                </>
              )}
            </button>
          </div>
          <ActivityLogs logs={activity} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
