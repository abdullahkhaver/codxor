import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
