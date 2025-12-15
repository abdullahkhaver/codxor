import { useState, useEffect, useMemo } from 'react';
import {
  FiTrash2,
  FiUserPlus,
  FiSearch,
  FiLoader,
  FiUserMinus,
} from 'react-icons/fi';
import debounce from 'lodash.debounce';


import ConfirmDialog from '../components/ConfirmDialog';
import useUsers from '../hooks/useUsers';
import useUserActions from '../hooks/useUserActions';

const ManageUsers = () => {
  const { users, setUsers, loading, fetchUsers } = useUsers();
  const {
    isPromoting,
    isDeleting,
    confirmAction,
    setConfirmAction,
    promoteToAdmin,
    demoteFromAdmin,
    deleteUser,
    banUser,
    unbanUser,
  } = useUserActions(setUsers, fetchUsers);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => handler.cancel();
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.username, user.email, user.fullName]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
        ),
    );
  }, [users, debouncedSearchTerm]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username, email, or name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={
                            user.profilePic || 'https://via.placeholder.com/150'
                          }
                          alt={user.username}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.fullName || '—'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {user.email || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.banned
                            ? 'bg-red-900 text-red-300'
                            : 'bg-green-900 text-green-300'
                        }`}
                      >
                        {user.banned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={isDeleting === user._id}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        >
                          {isDeleting === user._id ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <FiTrash2 />
                          )}
                        </button>

                        {user.role !== 'admin' ? (
                          <button
                            onClick={() => promoteToAdmin(user._id)}
                            disabled={isPromoting === user._id}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md disabled:opacity-50"
                          >
                            {isPromoting === user._id ? (
                              <FiLoader className="animate-spin" />
                            ) : (
                              <FiUserPlus />
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => demoteFromAdmin(user._id)}
                            disabled={isPromoting === user._id}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md disabled:opacity-50"
                          >
                            {isPromoting === user._id ? (
                              <FiLoader className="animate-spin" />
                            ) : (
                              <FiUserMinus />
                            )}
                          </button>
                        )}

                        <button
                          onClick={() =>
                            user.banned
                              ? unbanUser(user._id)
                              : banUser(user._id)
                          }
                          className={`px-3 py-1 rounded-md text-white ${
                            user.banned
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {user.banned ? 'Unban' : 'Ban'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    {searchTerm ? 'No matching users' : 'No users found'}
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
        message={confirmAction?.message}
        onCancel={() => setConfirmAction(null)}
        onConfirm={confirmAction?.onConfirm}
      />
    </div>
  );
};

export default ManageUsers;
