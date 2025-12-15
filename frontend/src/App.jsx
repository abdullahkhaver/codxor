import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import UserProfile from './pages/userprofile/UserProfile';
import Settings from './pages/settings/Settings';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to="/login" />;
}

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="w-screen h-screen overflow-hidden">
       <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:username"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/:username" element={<UserProfile />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
