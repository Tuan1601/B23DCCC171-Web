import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/dashboard.scss';

const Sidebar = () => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

useEffect(() => {
  const token = localStorage.getItem('token');
    
  if (!token) {
    setError('Chưa có token, vui lòng đăng nhập');
    setLoading(false);
    return;
  }

  axios.get('http://localhost:3000/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  })
  .then(response => {
    setUser(response.data);  
    setLoading(false);
  })
  .catch(error => {
    console.error('Lỗi lấy dữ liệu người dùng:', error);
    setError('Không thể lấy thông tin người dùng');
    setLoading(false); 
  });
}, []); 

  
  if (loading) {
    return <div>Đang tải...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  if (!user) {
    return <div>Không tìm thấy thông tin người dùng.</div>;  
  }

  return (
    <div className="sidebar">
      <div className="user-info">
         <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <nav>
      <Link to="/dashboard">Thống Kê</Link>
        <Link to="/profile">Trang cá nhân</Link>
        <Link to="/documents/all">Quản lý tài liệu</Link>
        <Link to="/documents/upload">Thêm tài liệu</Link>
        <Link to="/documents/approve">Phê duyệt tài liệu</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
