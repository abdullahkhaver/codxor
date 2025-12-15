import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import ManageUsers from './pages/ManageUsers.jsx';
import Conversations from './pages/Conversations.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="conversations" element={<Conversations />} />
      </Route>
    </Routes>
  );
}

export default App;
