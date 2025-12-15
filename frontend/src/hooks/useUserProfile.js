import { useEffect, useState, useCallback } from 'react';
import SERVER_URL from '../utils/SERVER_URL';
import { useAuthContext } from '../context/AuthContext';

export const useUserProfile = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authUser } = useAuthContext();
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = useCallback(() => {
    setRefreshCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/api/users/${username}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);

        // If it's the current user's profile, update auth context
        if (authUser?.username === username) {
          updateAuthUser(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchUser();
  }, [username, refreshCount, authUser]);

  return { user, loading, error, refresh };
};
