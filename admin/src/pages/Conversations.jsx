import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SERVER_URL from '../utils/SERVER_URL';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/admin/message`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch conversations');
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        toast.error(err.message || 'Error loading conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Conversations</h1>

      {loading ? (
        <p>Loading...</p>
      ) : conversations.length > 0 ? (
        <ul className="space-y-4">
          {conversations.map((conv) => (
            <li
              key={conv._id}
              className="bg-gray-800 p-4 rounded-lg shadow text-sm"
            >
              🧑‍🤝‍🧑{' '}
              {conv.participants
                .map((p) => p.fullName || p.username)
                .join(' & ')}
              <br />
              <span className="text-gray-400 text-xs">
                Last updated: {new Date(conv.updatedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;
