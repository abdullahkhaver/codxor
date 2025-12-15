// admin/src/hooks/useUsers.js
import { useEffect, useState, useCallback } from 'react';
import SERVER_URL from '../utils/SERVER_URL';
import toast from 'react-hot-toast';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/users`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsers(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, setUsers, loading, fetchUsers };
};

export default useUsers;
