import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SERVER_URL from '../utils/SERVER_URL';

const useAdminLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Clear admin session
      localStorage.removeItem('isAdmin');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useAdminLogout;
