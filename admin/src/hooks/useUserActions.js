// admin/src/hooks/useUserActions.js
import SERVER_URL from '../utils/SERVER_URL';
import toast from 'react-hot-toast';
import { useState } from 'react';

const useUserActions = (setUsers, fetchUsers) => {
  const [isPromoting, setIsPromoting] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleAction = async (
    url,
    method = 'PUT',
    successMessage,
    id = null,
    updateCallback = null,
  ) => {
    try {
      // Optimistic UI update
      if (id && updateCallback) {
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? updateCallback(user) : user)),
        );
      }

      const res = await fetch(url, {
        method,
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Action failed');

      toast.success(successMessage);

      // Refresh data to ensure consistency
      await fetchUsers();
    } catch (err) {
      toast.error(err.message);
      await fetchUsers();
    }
  };

  const promoteToAdmin = (id) => {
    setConfirmAction({
      message: 'Are you sure you want to promote this user to admin?',
      onConfirm: async () => {
        try {
          setIsPromoting(id);
          await handleAction(
            `${SERVER_URL}/api/admin/users/${id}/make-admin`,
            'PUT',
            'User promoted to admin',
            id,
            (user) => ({ ...user, role: 'admin' }),
          );
        } finally {
          setIsPromoting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const demoteFromAdmin = (id) => {
    setConfirmAction({
      message: 'Are you sure you want to remove admin privileges?',
      onConfirm: async () => {
        try {
          setIsPromoting(id);
          await handleAction(
            `${SERVER_URL}/api/admin/users/${id}/remove-admin`,
            'PUT',
            'Admin privileges removed',
            id,
            (user) => ({ ...user, role: 'user' }),
          );
        } finally {
          setIsPromoting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const deleteUser = (id) => {
    setConfirmAction({
      message: 'Are you sure you want to delete this user?',
      onConfirm: async () => {
        try {
          setIsDeleting(id);
          await handleAction(
            `${SERVER_URL}/api/admin/users/${id}`,
            'DELETE',
            'User deleted successfully',
            id,
            () => null, // will be filtered out after refetch
          );
        } finally {
          setIsDeleting(null);
          setConfirmAction(null);
        }
      },
    });
  };

  const banUser = (id) => {
    setConfirmAction({
      message: 'Are you sure you want to ban this user?',
      onConfirm: async () => {
        try {
          await handleAction(
            `${SERVER_URL}/api/admin/ban/${id}`,
            'PUT',
            'User banned successfully',
            id,
            (user) => ({ ...user, banned: true }),
          );
        } finally {
          setConfirmAction(null);
        }
      },
    });
  };

  const unbanUser = (id) => {
    setConfirmAction({
      message: 'Are you sure you want to unban this user?',
      onConfirm: async () => {
        try {
          await handleAction(
            `${SERVER_URL}/api/admin/unban/${id}`,
            'PUT',
            'User unbanned successfully',
            id,
            (user) => ({ ...user, banned: false }),
          );
        } finally {
          setConfirmAction(null);
        }
      },
    });
  };

  return {
    isPromoting,
    isDeleting,
    confirmAction,
    setConfirmAction,
    promoteToAdmin,
    demoteFromAdmin,
    deleteUser,
    banUser,
    unbanUser,
  };
};

export default useUserActions;
