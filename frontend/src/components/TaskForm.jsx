import React, { useState } from 'react';

const TaskForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [showTitleError, setShowTitleError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear title error when user starts typing
    if (name === 'title' && showTitleError) {
      setShowTitleError(false);
    }
  };

  const isTitleInvalid = formData.title.length > 100;
  const isDescriptionInvalid = formData.description.length > 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setShowTitleError(true);
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '' });
    setShowTitleError(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="task-title" className="block mb-2 font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="task-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
            className={`bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              isTitleInvalid || showTitleError
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Task Title"
          />
          <div className="flex justify-between items-center mt-1">
            {showTitleError && (
              <span className="text-red-500 text-sm">Title is required</span>
            )}
            <span className={`text-sm ml-auto ${
              formData.title.length > 100 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {formData.title.length}/100
            </span>
          </div>
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
            className={`w-full px-3 py-3 border-2 rounded-lg text-sm focus:outline-none transition-colors resize-y min-h-[100px] disabled:bg-gray-100 bg-white ${
              isDescriptionInvalid 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            }`}
            placeholder="Task Description"
          />
          <div className="text-right mt-1">
            <span className={`text-sm ${
              formData.description.length > 500 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {formData.description.length}/500
            </span>
          </div>
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
