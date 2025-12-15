import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login, error } = useLogin(); // Assumes error is returned

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="h-screen bg-[#0f1117] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1117] via-[#1a1d24] to-[#0f1117] opacity-90 -z-10" />
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-[#6366f1] rounded-full filter blur-3xl opacity-20" />
      <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-[#8b5cf6] rounded-full filter blur-3xl opacity-20" />

      <div className="relative z-10 bg-[#1a1d24] border border-[#2d2f36] rounded-2xl shadow-2xl p-8 lg:p-12 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center items-center p-4">
          <div className="mb-8">
            <svg
              className="w-24 h-24 text-[#6366f1]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-3.668-.78l-4.71 1.99a1 1 0 01-1.341-1.342l1.99-4.71A8.96 8.96 0 012 10c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-center text-[#e5e7eb] mb-4">
            CodXor
          </h1>
          <p className="text-center text-[#9ca3af] text-lg mb-6">
            Connect with your community in real-time
          </p>

          <div className="space-y-4 w-full max-w-xs">
            <Feature
              iconColor="#6366f1"
              text="Lightning fast messaging"
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <Feature
              iconColor="#8b5cf6"
              text="End-to-end encryption"
              iconPath="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-center lg:hidden mb-6">
            <svg
              className="w-16 h-16 text-[#6366f1]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-3.668-.78l-4.71 1.99a1 1 0 01-1.341-1.342l1.99-4.71A8.96 8.96 0 012 10c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-center text-[#e5e7eb] mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-[#9ca3af] mb-8 text-lg">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              autoComplete="username"
              type="text"
            />

            <div>
              <label
                htmlFor="password"
                className="block text-[#e5e7eb] text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 bg-[#2d2f36] border border-[#2d2f36] rounded-lg text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1] pr-12"
                  placeholder="********"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#0ea5e9]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#6366f1] focus:ring-[#6366f1] border-[#2d2f36] rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-[#9ca3af]"
              >
                Remember me
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#8b5cf6] text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[#9ca3af] text-base">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-[#8b5cf6] hover:underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ iconColor, text, iconPath }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-[#2d2f36] bg-opacity-50 rounded-lg">
      <div
        className="rounded-lg p-2"
        style={{ backgroundColor: iconColor }}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={iconPath}
          />
        </svg>
      </div>
      <span className="text-[#e5e7eb]">{text}</span>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  type,
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[#e5e7eb] text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full px-5 py-3 bg-[#2d2f36] border border-[#2d2f36] rounded-lg text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
      />
    </div>
  );
}

export default LoginPage;
