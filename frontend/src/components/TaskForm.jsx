import React, { useState } from 'react';

const TaskForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '' });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="task-title" className="block mb-2 font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="task-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Task Title"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="task-description" className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            disabled={loading}
            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors resize-y min-h-[100px] disabled:bg-gray-100 bg-white"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
