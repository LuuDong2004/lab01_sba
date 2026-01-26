import api from './api';

export const userService = {
  // Login - tìm user theo username và password
  login: async (username, password) => {
    try {
      const response = await api.get('/users/login', {
        params: { username, password }
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Lấy tất cả users
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Lấy user theo username
  getByUsername: async (username) => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw error;
    }
  },

  // Tạo mới user
  create: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Cập nhật user
  update: async (username, userData) => {
    try {
      const response = await api.put(`/users/${username}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Xóa user
  delete: async (username) => {
    try {
      const response = await api.delete(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};
