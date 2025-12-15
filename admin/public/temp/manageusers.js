import { useEffect, useState } from 'react';
import SERVER_URL from '../utils/SERVER_URL';
import toast from 'react-hot-toast';
import {
  FiTrash2,
  FiUserPlus,
  FiSearch,
  FiLoader,
  FiUserMinus,
} from 'react-icons/fi';
import ConfirmDialog from '../components/ConfirmDialog';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPromoting, setIsPromoting] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/admin/users`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (id) => {
    setConfirmAction({
      message: 'Are you sure you want to promote this user to admin?',
      onConfirm: async () => {
        try {
          setIsPromoting(id);
          const res = await fetch(
            `${SERVER_URL}/api/admin/users/${id}/make-admin`,
            {
              method: 'PUT',
              credentials: 'include',
            },
          );
          const data = await res.json();
          if (res.ok) {
            toast.success('User promoted to admin');
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, role: 'admin' } : u)),
            );
          } else {
            toast.error(data.message || 'Failed to promote user');
          }
        } catch {
          toast.error('Promotion request failed');
        } finally {
          setIsPromoting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const demoteFromAdmin = async (id) => {
    setConfirmAction({
      message:
        'Are you sure you want to remove admin privileges from this user?',
      onConfirm: async () => {
        try {
          setIsPromoting(id);
          const res = await fetch(
            `${SERVER_URL}/api/admin/users/${id}/remove-admin`,
            {
              method: 'PUT',
              credentials: 'include',
            },
          );
          const data = await res.json();
          if (res.ok) {
            toast.success('Admin privileges removed');
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, role: 'user' } : u)),
            );
          } else {
            toast.error(data.message || 'Failed to demote user');
          }
        } catch {
          toast.error('Demotion request failed');
        } finally {
          setIsPromoting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const deleteUser = async (id) => {
    setConfirmAction({
      message:
        'Are you sure you want to delete this user? This action cannot be undone.',
      onConfirm: async () => {
        try {
          setIsDeleting(id);
          const res = await fetch(`${SERVER_URL}/api/admin/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const data = await res.json();
          if (res.ok) {
            toast.success('User deleted successfully');
            setUsers((prev) => prev.filter((u) => u._id !== id));
          } else {
            toast.error(data.error || 'Failed to delete user');
          }
        } catch {
          toast.error('Delete request failed');
        } finally {
          setIsDeleting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const banUser = async (id) => {
    setConfirmAction({
      message: 'Are you sure you want to ban this user?',
      onConfirm: async () => {
        try {
          const res = await fetch(`${SERVER_URL}/api/admin/ban/${id}`, {
            method: 'PUT',
            credentials: 'include',
          });
          const data = await res.json();
          if (res.ok) {
            toast.success('User banned successfully');
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, banned: true } : u)),
            );
          } else {
            toast.error(data.error || 'Failed to ban user');
          }
        } catch {
          toast.error('Ban request failed');
        } finally {
          setConfirmAction(null);
        }
      },
    });
  };

  const unbanUser = async (id) => {
    setConfirmAction({
      message: 'Are you sure you want to unban this user?',
      onConfirm: async () => {
        try {
          const res = await fetch(`${SERVER_URL}/api/admin/unban/${id}`, {
            method: 'PUT',
            credentials: 'include',
          });
          const data = await res.json();
          if (res.ok) {
            toast.success('User unbanned successfully');
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, banned: false } : u)),
            );
          } else {
            toast.error(data.error || 'Failed to unban user');
          }
        } catch {
          toast.error('Unban request failed');
        } finally {
          setConfirmAction(null);
        }
      },
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl max-w-7xl mx-auto transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Manage Users</h2>
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username, email, or name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader
            className="animate-spin text-4xl text-blue-500"
            aria-label="Loading users"
          />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={
                            user.profilePic || 'https://via.placeholder.com/150'
                          }
                          alt={`${user.username}'s profile`}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.fullName || '—'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.banned
                            ? 'bg-red-900 text-red-300'
                            : 'bg-green-900 text-green-300'
                        }`}
                      >
                        {user.banned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={isDeleting === user._id}
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          aria-label={`Delete ${user.username}`}
                        >
                          {isDeleting === user._id ? (
                            <FiLoader className="animate-spin mr-1" />
                          ) : (
                            <FiTrash2 className="mr-1" />
                          )}
                          Delete
                        </button>
                        {user.role !== 'admin' ? (
                          <button
                            onClick={() => promoteToAdmin(user._id)}
                            disabled={isPromoting === user._id}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            aria-label={`Promote ${user.username} to admin`}
                          >
                            {isPromoting === user._id ? (
                              <FiLoader className="animate-spin mr-1" />
                            ) : (
                              <FiUserPlus className="mr-1" />
                            )}
                            Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => demoteFromAdmin(user._id)}
                            disabled={isPromoting === user._id}
                            className="inline-flex items-center px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            aria-label={`Demote ${user.username} from admin`}
                          >
                            {isPromoting === user._id ? (
                              <FiLoader className="animate-spin mr-1" />
                            ) : (
                              <FiUserMinus className="mr-1" />
                            )}
                            Remove Admin
                          </button>
                        )}
                        <button
                          onClick={() =>
                            user.banned
                              ? unbanUser(user._id)
                              : banUser(user._id)
                          }
                          className={`inline-flex items-center px-3 py-1.5 ${
                            user.banned
                              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                              : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                          } text-white rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
                          aria-label={`${user.banned ? 'Unban' : 'Ban'} ${
                            user.username
                          }`}
                        >
                          <FiUserMinus className="mr-1" />
                          {user.banned ? 'Unban' : 'Ban'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-400"
                  >
                    {searchTerm
                      ? 'No matching users found'
                      : 'No users available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDialog
        isOpen={!!confirmAction}
        title="Confirm Action"
        message={confirmAction?.message || ''}
        onCancel={() => setConfirmAction(null)}
        onConfirm={confirmAction?.onConfirm}
      />
    </div>
  );
};

export default ManageUsers;
