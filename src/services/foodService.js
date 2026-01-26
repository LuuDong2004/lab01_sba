import api from './api';

export const foodService = {
  // Lấy tất cả foods
  getAll: async () => {
    try {
      const response = await api.get('/foods');
      return response.data;
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  },

  // Lấy food theo ID
  getById: async (id) => {
    try {
      const response = await api.get(`/foods/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching food by id:', error);
      throw error;
    }
  },

  // Tạo mới food
  create: async (foodData) => {
    try {
      const response = await api.post('/foods', foodData);
      return response.data;
    } catch (error) {
      console.error('Error creating food:', error);
      throw error;
    }
  },

  // Cập nhật food
  update: async (id, foodData) => {
    try {
      const response = await api.put(`/foods/${id}`, foodData);
      return response.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  // Xóa food
  delete: async (id) => {
    try {
      const response = await api.delete(`/foods/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  },

  // Tìm kiếm theo tên
  searchByName: async (name) => {
    try {
      const response = await api.get('/foods/search', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching foods by name:', error);
      throw error;
    }
  },

  // Tìm kiếm theo category
  searchByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/foods/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error searching foods by category:', error);
      throw error;
    }
  },

  // Tìm kiếm theo tên và category
  searchByNameAndCategory: async (name, categoryId) => {
    try {
      const response = await api.get('/foods/search/category', {
        params: { name, categoryId }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching foods by name and category:', error);
      throw error;
    }
  },
};
