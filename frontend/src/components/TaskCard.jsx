import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const TaskCard = ({ task, onCompleteTask, onDeleteTask }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const getPriorityVariant = (task) => {
    if (task.is_completed === 1) {
      return 'default';
    }
    
    const createdDate = new Date(task.created_at);
    const now = new Date();
    const daysDiff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 7) {
      return 'destructive';
    } else if (daysDiff > 3) {
      return 'secondary';
    } else {
      return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Checkbox */}
            <div className="flex-shrink-0">
              {task.is_completed === 1 ? (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              ) : (
                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
              )}
            </div>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium ${
                task.is_completed === 1 ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-xs mt-1 ${
                  task.is_completed === 1 ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Due Date - Hidden on small screens */}
            <div className="hidden sm:flex items-center text-xs text-muted-foreground flex-shrink-0">
              <Clock className="w-4 h-4 mr-1" />
              {formatDate(task.created_at)}
            </div>

            {/* Priority Badge */}
            <div className="flex-shrink-0 flex items-center">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task)}`}></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end sm:justify-start space-x-2 sm:ml-4">
            {task.is_completed !== 1 && (
              <>
                <Button
                  onClick={() => onCompleteTask(task.id)}
                  size="sm"
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Mark Done</span>
                </Button>
                {onDeleteTask && (
                  <Button
                    onClick={() => setShowDeleteDialog(true)}
                    size="sm"
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    {/* <span className="hidden sm:inline">Delete</span> */}
                  </Button>
                )}
              </>
            )}
            {task.is_completed === 1 && (
              <Badge className="text-xs bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>
        
        {/* Due Date - Show on small screens */}
        <div className="flex sm:hidden items-center text-xs text-muted-foreground mt-2">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(task.created_at)}
        </div>
      </CardContent>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDeleteTask(task.id);
          setShowDeleteDialog(false);
        }}
        taskTitle={task.title}
      />
    </Card>
  );
};

export default TaskCard;