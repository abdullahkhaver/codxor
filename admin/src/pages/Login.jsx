import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../utils/SERVER_URL';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true },
      );

      const user = res.data;

      if (user.role === 'admin') {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('chat-user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError('Access denied: You are not an admin');
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Login failed. Please check your credentials.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex justify-center items-center rounded-xl overflow-hidden shadow-2xl min-w-full">
        {/* Form Section */}
        <div className=" md:w-1/2 p-8 sm:p-12">
          <div className="flex justify-center mb-8">
            <div className="rounded-full">
              <img
                src="/codxor.png"
                alt="Logo"
                className="h-16 w-16 object-contain rounded-lg bg-white p-1"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            CX Control Panel
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Admin Dashboard Login
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                isLoading
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700'
              } transition flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-red-400">
            <p>For authorized personnel only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

