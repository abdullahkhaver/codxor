import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="h-screen bg-[#0f1117] flex items-center justify-center p-4 font-inter relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1117] via-[#1a1d24] to-[#0f1117] opacity-90 -z-10"></div>
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-[#6366f1] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-[#8b5cf6] rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 bg-[#1a1d24] border border-[#2d2f36] rounded-2xl shadow-2xl w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 transform hover:scale-[1.003] transition duration-300 overflow-hidden max-h-[90vh]">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center items-center p-4 overflow-y-auto max-h-[90vh]">
          <svg
            className="w-16 h-16 text-[#6366f1] mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-3.668-.78l-4.71 1.99a1 1 0 01-1.341-1.342l1.99-4.71A8.96 8.96 0 012 10c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="text-2xl font-bold text-center text-[#e5e7eb] mb-2 leading-tight">
            CodXor
          </h1>
          <p className="text-center text-[#9ca3af] text-sm mb-4 px-4">
            Connect with your community in real-time
          </p>

          <div className="space-y-3 w-full max-w-xs">
            <div className="flex items-center space-x-3 p-3 bg-[#2d2f36] bg-opacity-50 rounded-lg">
              <div className="p-2 bg-[#6366f1] rounded-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-[#e5e7eb] text-sm">
                Lightning fast messaging
              </span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-[#2d2f36] bg-opacity-50 rounded-lg">
              <div className="p-2 bg-[#8b5cf6] rounded-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-[#e5e7eb] text-sm">
                End-to-end encryption
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-[#e5e7eb] text-center mb-1">
            Create Account
          </h2>
          <p className="text-[#9ca3af] text-center mb-6 text-sm">
            Join our community today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#e5e7eb] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg bg-[#2d2f36] text-white border border-[#2d2f36] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1]"
                  value={inputs.fullName}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm text-[#e5e7eb] block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="johndoe"
                  className="w-full px-4 py-2 rounded-lg bg-[#2d2f36] text-white border border-[#2d2f36] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1]"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-sm text-[#e5e7eb] block mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2d2f36] text-white border border-[#2d2f36] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1]"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute top-7 right-3 text-[#9ca3af]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="relative">
                <label className="text-sm text-[#e5e7eb] block mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-[#2d2f36] text-white border border-[#2d2f36] placeholder-[#9ca3af] focus:ring-2 focus:ring-[#6366f1]"
                  value={inputs.confirmPassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute top-7 right-3 text-[#9ca3af]"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#e5e7eb] block mb-1">
                Gender
              </label>
              <GenderCheckbox
                onCheckboxChange={handleCheckboxChange}
                selectedGender={inputs.gender}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#8b5cf6] text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] flex items-center justify-center"
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
                  Creating Account...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#9ca3af]">
            Already have an account?{' '}
            <Link to="/" className="text-[#8b5cf6] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
