import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL của backend
});

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem('token');

// Hàm xử lý thêm token vào các yêu cầu API
const addAuthHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

// Sử dụng interceptor để thêm token vào tất cả các yêu cầu
api.interceptors.request.use(addAuthHeader);

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;  // Giả sử API trả về token trong `data.token`
    localStorage.setItem('token', token);  // Lưu token vào localStorage
    return response;
  } catch (error) {
    throw new Error('Đăng nhập thất bại');
  }
};
export const getAllSubjects = () => api.get('/subjects');

export const getAllDocuments = () => api.get('/admin/documents');
export const uploadDocument = async (data) => {
  try {
    const response = await api.post('/documents/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi upload tài liệu:', error);
    throw error;
  }
};
export const getUnapprovedDocuments = () => api.get('/approvals/unapproved');
export const approveDocument = (id, status, reason) =>
  api.post('/approvals/approve', { document_id: id, status, reason });
// api.js (where you make the Axios request)
export const getStats = () => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    throw new Error('Token không tồn tại. Vui lòng đăng nhập lại!');
  }

  return api.get('/dashboard/stats', {
    headers: {
      Authorization: `Bearer ${token}`  // Add the token in the header
    }
  });
};

export const getProfile = () => api.get('/auth/profile');

export default api;
