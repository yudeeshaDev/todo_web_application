import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onCompleteTask, loading = false, emptyMessage = "No tasks found" }) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <h3 className="text-lg font-medium text-gray-400 mb-2">No tasks found</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onCompleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
