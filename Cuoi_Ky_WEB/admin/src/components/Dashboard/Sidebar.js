import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/dashboard.scss';

const Sidebar = () => {
  const [user, setUser] = useState(null);  // State để lưu dữ liệu người dùng
  const [loading, setLoading] = useState(true);  // Kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Thêm trạng thái lỗi

  // Sidebar.js
useEffect(() => {
  const token = localStorage.getItem('token');
    
  if (!token) {
    setError('Chưa có token, vui lòng đăng nhập');
    setLoading(false);
    return;
  }

  // Ensure the token is in the Authorization header properly
  axios.get('http://localhost:3000/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}` // Correct token format
    }
  })
  .then(response => {
    setUser(response.data);  // Save user data in state
    setLoading(false);
  })
  .catch(error => {
    console.error('Lỗi lấy dữ liệu người dùng:', error);
    setError('Không thể lấy thông tin người dùng');
    setLoading(false); // Set loading to false even if an error occurs
  });
}, []); // Run once on component mount

  
  if (loading) {
    return <div>Đang tải...</div>;  // Hiển thị khi dữ liệu đang được tải
  }

  if (error) {
    return <div>{error}</div>;  // Hiển thị thông báo lỗi
  }

  if (!user) {
    return <div>Không tìm thấy thông tin người dùng.</div>;  // Nếu không có dữ liệu người dùng
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
