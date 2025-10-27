import React from 'react';

const TaskCard = ({ task, onCompleteTask, onDeleteTask }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (task) => {
    // Simple priority logic based on creation date and completion status
    if (task.is_completed === 1) {
      return 'bg-green-500';
    }
    
    const createdDate = new Date(task.created_at);
    const now = new Date();
    const daysDiff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) {
      return 'bg-red-500';
    } else if (daysDiff > 3) {
      return 'bg-yellow-500';
    } else {
      return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Checkbox */}
          <div className="flex-shrink-0">
            {task.is_completed === 1 ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            )}
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium ${task.is_completed === 1 ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-xs mt-1 ${task.is_completed === 1 ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="flex items-center text-xs text-gray-500 flex-shrink-0">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(task.created_at)}
          </div>

          {/* Priority Indicator */}
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task)} flex-shrink-0`}></div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {task.is_completed !== 1 && (
            <>
              <button
                onClick={() => onCompleteTask(task.id)}
                className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors"
              >
                Mark Done
              </button>
              {onDeleteTask && (
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              )}
            </>
          )}
          {task.is_completed === 1 && (
            <span className="text-xs text-gray-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;