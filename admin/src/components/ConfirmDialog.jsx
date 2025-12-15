import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <button
              onClick={onCancel}
              className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              aria-label="Close dialog"
            >
              <FiX size={20} />
            </button>
          </div>
          <p className="mb-6 text-gray-300 text-sm">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
