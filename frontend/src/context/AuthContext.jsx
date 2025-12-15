import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const user = localStorage.getItem('chat-user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const updateAuthUser = useCallback((user) => {
    setAuthUser(user);
    try {
      if (user) {
        localStorage.setItem('chat-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('chat-user');
      }
    } catch (error) {
      console.error('Failed to update localStorage:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser: updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
