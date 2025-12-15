import { FiUser } from 'react-icons/fi';

const RecentUsersTable = ({ users }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700">
      {users.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Joined
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {user.profilePic ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.profilePic}
                          alt={user.username}
                        />
                      ) : (
                        <FiUser className="text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{user.username}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-gray-400 text-sm">
          No recent user signups
        </div>
      )}
    </div>
  );
};

export default RecentUsersTable;
