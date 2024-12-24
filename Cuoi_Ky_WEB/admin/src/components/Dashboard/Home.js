import React, { useEffect, useState } from 'react';
import { getStats } from '../../services/api';
import Sidebar from './Sidebar';
import Stats from './Stats';
import '../../styles/dashboard.scss';

const Home = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getStats();
        setStats(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Token hết hạn, vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          window.location.href = '/login'; // Redirect to login page
        } else {
          console.error('Error fetching stats:', error);
        }
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Thống kê</h1>
        {stats && <Stats stats={stats} />}
      </div>
    </div>
  );
};

export default Home;
