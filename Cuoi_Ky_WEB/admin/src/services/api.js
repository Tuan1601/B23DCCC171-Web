import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

const getToken = () => localStorage.getItem('token');

const addAuthHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addAuthHeader);

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const token = response.data.token;  
    localStorage.setItem('token', token);  
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
export const getStats = () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    throw new Error('Token không tồn tại. Vui lòng đăng nhập lại!');
  }

  return api.get('/dashboard/stats', {
    headers: {
      Authorization: `Bearer ${token}`  
    }
  });
};

export const getProfile = () => api.get('/auth/profile');

export default api;
