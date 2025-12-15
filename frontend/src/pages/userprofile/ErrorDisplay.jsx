const ErrorDisplay = ({ message }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-screen h-screen flex items-center justify-center bg-[#0f1117]"
    >
      <div className="text-center max-w-md bg-[#1a1d24] backdrop-blur-lg p-8 rounded-2xl border border-[#2d2f36]">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#ef4444] to-[#8b5cf6] bg-clip-text text-transparent mb-3">
          Profile Not Found
        </div>
        <p className="text-[#9ca3af] mb-6">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#0ea5e9] hover:to-[#6366f1] rounded-full text-[#e5e7eb] font-medium transition-all shadow-lg"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );

export default ErrorDisplay
