import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import '../../styles/auth.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(credentials);
      localStorage.setItem('token', data.token); // Lưu token vào localStorage
      navigate('/dashboard');
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };
  

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={credentials.password}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
