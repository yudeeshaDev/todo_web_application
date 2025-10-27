import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskCardList = ({ tasks, onCompleteTask, onDeleteTask, loading = false, emptyMessage = "No tasks found" }) => {
  const [showCompleted, setShowCompleted] = useState(false);

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

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => task.is_completed !== 1);
  const completedTasks = tasks.filter(task => task.is_completed === 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Active Tasks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Tasks</h3>
        {pendingTasks.length > 0 ? (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No active tasks</p>
          </div>
        )}
      </div>

      {/* Right Column - Completed Tasks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Completed ({completedTasks.length})
        </h3>
        {completedTasks.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No completed tasks</p>
          </div>
        )}
      </div>

      {/* No tasks message - only show if both columns are empty */}
      {pendingTasks.length === 0 && completedTasks.length === 0 && (
        <div className="col-span-2 text-center py-10 text-gray-600">
          <h3 className="text-lg font-medium text-gray-400 mb-2">No tasks found</h3>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TaskCardList;
