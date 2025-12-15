import { FiClock } from 'react-icons/fi';

const ActivityLogs = ({ logs }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 max-h-80 overflow-y-auto">
      {logs.length > 0 ? (
        <ul className="divide-y divide-gray-700">
          {logs.map((log, index) => (
            <li key={index} className="px-4 py-3 hover:bg-gray-700/30 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-gray-500">
                  <FiClock size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200">{log.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-center text-gray-400 text-sm">
          No activity logs available
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;
