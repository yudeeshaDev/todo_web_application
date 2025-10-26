import React from 'react';

const TaskCard = ({ task, onComplete }) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex justify-between items-start gap-4" data-task-id={task.id}>
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-800 mb-2">{task.title}</div>
        <div className="text-sm text-gray-600 leading-relaxed">
          {task.description || 'No description'}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-green-700 transition-colors" 
          onClick={handleComplete}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
