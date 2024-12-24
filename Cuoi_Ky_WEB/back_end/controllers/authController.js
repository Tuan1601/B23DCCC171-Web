const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Tên người dùng đã tồn tại.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ 
      username, 
      password_hash: hashedPassword, 
      email, 
      role: role || 'user' 
    });

    res.status(201).json({ message: 'Đăng ký người dùng thành công.' });
  } catch (err) {
    console.error('Lỗi đăng ký người dùng:', err);
    res.status(500).json({ error: 'Không thể đăng ký người dùng.', details: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Vui lòng cung cấp tên đăng nhập và mật khẩu.' });
  }

  try {
    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không hợp lệ.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key', 
      { expiresIn: '1h' } 
    );

    res.json({ 
      message: 'Đăng nhập thành công.', 
      token 
    });
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ error: 'Không thể đăng nhập.' });
  }
};

exports.getProfile = async (req, res) => {
  console.log('User from Token:', req.user);  
  try {
    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi lấy thông tin người dùng', details: error.message });
  }
};
