import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskTable from '../components/TaskTable';
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
    <div className="fade-in min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-5 mb-8">
            <button 
              onClick={handleBackToMain}
              className="bg-gray-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              ← Back to Main
            </button>
            <h2 className="text-3xl font-semibold text-gray-800">All Tasks</h2>
          </div>
          <Message message={message} type={messageType} />
          <TaskTable
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            loading={loading}
            emptyMessage="No tasks to display."
          />
        </div>
      </div>
    </div>
  );
};

export default AllTasksPage;
