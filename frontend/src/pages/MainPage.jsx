import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Message from '../components/Message';
import { taskAPI } from '../services/api';

const MainPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    loadRecentTasks();
  }, []);

  const loadRecentTasks = async () => {
    try {
      setLoading(true);
      const recentTasks = await taskAPI.fetchRecentTasks();
      setTasks(recentTasks);
    } catch (error) {
      showMessage('Error loading tasks: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      setFormLoading(true);
      await taskAPI.createTask(taskData);
      showMessage('Task added successfully!', 'success');
      await loadRecentTasks();
    } catch (error) {
      showMessage('Error adding task: ' + error.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await taskAPI.markTaskAsCompleted(taskId);
      showMessage('Task completed!', 'success');
      await loadRecentTasks();
    } catch (error) {
      showMessage('Error completing task: ' + error.message, 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    if (type === 'success') {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleViewAllTasks = () => {
    navigate('/all-tasks');
  };

  return (
    <div className="fade-in min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <TaskForm onSubmit={handleAddTask} loading={formLoading} />
          </div>
          
        
          <div className="lg:col-span-9 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
              <button 
                onClick={handleViewAllTasks}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm transition-colors"
              >
                View All Tasks
              </button>
            </div>
            
            <Message message={message} type={messageType} />
            
            {/* Fixed height container for tasks */}
            <div className="flex-1 overflow-y-auto max-h-96 custom-scrollbar">
              <TaskList
                tasks={tasks}
                onCompleteTask={handleCompleteTask}
                loading={loading}
                emptyMessage="No recent tasks to display."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
