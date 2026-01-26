import api from './api';

export const categoryService = {
  // Lấy tất cả categories
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Lấy category theo ID
  getById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by id:', error);
      throw error;
    }
  },
};
