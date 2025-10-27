import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCardList from '../components/TaskCardList';
import Message from '../components/Message';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    try {
      await taskAPI.deleteTask(taskId);
      showMessage('Task deleted successfully!', 'success');
      await loadAllTasks();
    } catch (error) {
      showMessage('Error deleting task: ' + error.message, 'error');
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
    <div className="h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 py-6 sm:py-8 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <Button 
            onClick={handleBackToMain}
            className="flex items-center gap-2 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Main
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">All Tasks</h1>
          <div className="hidden sm:block"></div> {/* Spacer for centering */}
        </div>
        
        <Message message={message} type={messageType} />
        
        <div className="flex-1 overflow-hidden">
          <TaskCardList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            loading={loading}
            emptyMessage="No tasks to display."
          />
        </div>
      </div>
    </div>
  );
};

export default AllTasksPage;
