const StatCard = ({ icon, label, value, change, bgColor }) => {
  return (
    <div
      className={`${bgColor} rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">{label}</span>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        {change && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
