// Input.jsx
const Input = ({
  label,
  name,
  value,
  onChange,
  textarea,
  icon,
  placeholder,
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className={`w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            icon ? 'pl-10' : ''
          }`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            icon ? 'pl-10' : ''
          }`}
        />
      )}
    </div>
  </div>
);

export default Input;
