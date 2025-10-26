import React from 'react';

const Message = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const baseClasses = "px-4 py-3 rounded-md mb-5 border";
  const successClasses = "bg-green-50 text-green-800 border-green-200";
  const errorClasses = "bg-red-50 text-red-800 border-red-200";

  return (
    <div className={`${baseClasses} ${type === 'success' ? successClasses : errorClasses}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose} 
            className="ml-2 text-lg hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
