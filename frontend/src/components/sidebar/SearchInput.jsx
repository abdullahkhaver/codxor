import { useState, useEffect, useRef } from 'react';
import { IoSearchSharp, IoClose } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error('No such user found!');
    }
  };

  const clearSearch = () => {
    setSearch('');
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center transition-all duration-200 ${
            isFocused ? 'ring-2 ring-sky-400' : ''
          } bg-gray-800 rounded-full px-4 py-2`}
        >
          <IoSearchSharp className="text-gray-400 w-5 h-5 mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users..."
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {search && (
              <motion.button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoClose className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle animated submit button that only appears when typing */}
        {search.length > 0 && (
          <motion.button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-sky-400 hover:text-sky-300"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            Search
          </motion.button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
