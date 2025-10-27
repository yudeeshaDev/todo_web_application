import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Message from '../components/Message';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Task Form */}
          <div className="lg:col-span-4">
            <TaskForm onSubmit={handleAddTask} loading={formLoading} />
          </div>
          
          {/* Recent Tasks */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Recent Tasks</h2>
              <Button 
                onClick={handleViewAllTasks}
                className="flex items-center gap-2 w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/80"
              >
                View All Tasks
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Message message={message} type={messageType} />
            
            {/* Fixed height container for tasks */}
            <div className="overflow-y-auto max-h-80 sm:max-h-96 custom-scrollbar">
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
