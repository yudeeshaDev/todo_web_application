import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// API service for task management
export const taskAPI = {
  // Fetch recent tasks (latest 5 uncompleted)
  async fetchRecentTasks() {
    try {
      const response = await apiClient.get('/tasks?completed=0&limit=5');
      
      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch recent tasks');
      }
    } catch (error) {
      console.error('Error fetching recent tasks:', error);
      throw error;
    }
  },

  // Fetch all tasks (including completed and uncompleted)
  async fetchAllTasks() {
    try {
      const response = await apiClient.get('/tasks');
      
      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch all tasks');
      }
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await apiClient.post('/tasks', taskData);
      
      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Mark task as completed
  async markTaskAsCompleted(taskId) {
    try {
      const response = await apiClient.patch(`/tasks/${taskId}/complete`);
      
      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to complete task');
      }
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  }
};
