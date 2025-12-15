// frontend/src/context/SocketContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';
import SERVER_URL from '../utils/SERVER_URL';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(SERVER_URL, {
        path: '/socket',
        query: { userId: authUser._id },
        withCredentials: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        setIsConnected(true);
        console.log('Socket connected');
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketInstance.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      socketInstance.on('profileUpdated', (data) => {
        if (data.userId === authUser?._id) {
          console.log('Profile update received:', data);
          setAuthUser((prev) => ({ ...prev, ...data.updatedFields }));
        }
      });

      return () => {
        socketInstance.disconnect();
        setIsConnected(false);
      };
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
      setOnlineUsers([]);
      setIsConnected(false);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
