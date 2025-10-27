import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCardList from '../components/TaskCardList';
import Message from '../components/Message';
import { taskAPI } from '../services/api';

const AllTasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    loadAllTasks();
  }, []);

  const loadAllTasks = async () => {
    try {
      setLoading(true);
      const allTasks = await taskAPI.fetchAllTasks();
      setTasks(allTasks);
    } catch (error) {
      showMessage('Error loading tasks: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await taskAPI.markTaskAsCompleted(taskId);
      showMessage('Task completed!', 'success');
      await loadAllTasks();
    } catch (error) {
      showMessage('Error completing task: ' + error.message, 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        showMessage('Task deleted successfully!', 'success');
        await loadAllTasks();
      } catch (error) {
        showMessage('Error deleting task: ' + error.message, 'error');
      }
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    if (type === 'success') {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
   
      <div className="w-full px-10 py-8">
      
          <div className="flex items-center justify-between mb-10">
            <button 
              onClick={handleBackToMain}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              ← Back to Main
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 flex-1 text-center">All Tasks</h2>
          </div>
          <Message message={message} type={messageType} />
          <div className="w-full">
            <TaskCardList
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
              loading={loading}
              emptyMessage="No tasks to display."
            />
          </div>
      </div>
   
  );
};

export default AllTasksPage;
