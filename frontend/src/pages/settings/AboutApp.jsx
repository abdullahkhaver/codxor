import { motion } from 'framer-motion';

const AboutApp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 text-white max-w-3xl w-full"
    >
      <h1 className="text-3xl font-bold mb-6 text-teal-400">About This App</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/30 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-teal-400">
          App Information
        </h2>
        <p className="mb-4 text-gray-200">
          This Real-Time Chat App is designed for developers to learn, grow, and
          collaborate with peers in a dynamic environment.
        </p>
        <p className="text-gray-300">Version: 1.0.0</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/30 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-teal-400">
          Developer Information
        </h2>
        <p className="mb-2 text-gray-200">
          <strong>Name:</strong> Muhammad Abdullah Khaver
        </p>
        <p className="mb-2 text-gray-200">
          <strong>Email:</strong> muhammadabdullahkhaver@gmail.com
        </p>
        <p className="mb-2 text-gray-200">
          <strong>Phone:</strong> +92 329 4171505
        </p>
        <p className="text-gray-200">
          <strong>Portfolio:</strong>{' '}
          <a
            href="https://abdullahkhaver.github.io/portfolio/"
            className="text-teal-400 hover:underline"
          >
            abdullahkhaver.github.io/portfolio
          </a>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/30 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-teal-400">
          Privacy & Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="h-5 w-5 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-200">
                End-to-End Encryption
              </h3>
              <p className="mt-1 text-gray-300">
                All your messages are encrypted in transit and at rest. We don't
                have access to read your conversations.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="h-5 w-5 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-200">
                Password Security
              </h3>
              <p className="mt-1 text-gray-300">
                Your password is hashed using bcrypt before storage. We never
                store or see your actual password.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="h-5 w-5 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-200">
                Data Minimization
              </h3>
              <p className="mt-1 text-gray-300">
                We only collect what's necessary to provide our service. You're
                in control of your data.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/30 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-teal-400">Mobile App</h2>
        <p className="text-2xl font-bold text-teal-400">Coming Soon...</p>
      </motion.div>
    </motion.div>
  );
};

export default AboutApp;
