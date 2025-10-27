import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const TaskCardList = ({ tasks, onCompleteTask, onDeleteTask, loading = false, emptyMessage = "No tasks found" }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          <p className="text-muted-foreground">Loading tasks...</p>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-10 text-center">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No tasks found</h3>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => task.is_completed !== 1);
  const completedTasks = tasks.filter(task => task.is_completed === 1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 h-full">
      {/* Left Column - Active Tasks */}
      <Card className="flex flex-col max-h-[600px]">
        <CardHeader>
          <CardTitle className="text-lg">Active Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {pendingTasks.length > 0 ? (
            <div className="space-y-3 h-full overflow-y-auto custom-scrollbar">
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
            <div className="text-center py-8 text-muted-foreground">
              <p>No active tasks</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Column - Completed Tasks */}
      <Card className="flex flex-col max-h-[600px]">
        <CardHeader>
          <CardTitle className="text-lg">
            Completed Tasks({completedTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {completedTasks.length > 0 ? (
            <div className="space-y-3 h-full overflow-y-auto custom-scrollbar">
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
            <div className="text-center py-8 text-muted-foreground">
              <p>No completed tasks</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* No tasks message - only show if both columns are empty */}
      {pendingTasks.length === 0 && completedTasks.length === 0 && (
        <Card className="xl:col-span-2">
          <CardContent className="p-10 text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No tasks found</h3>
            <p className="text-muted-foreground">{emptyMessage}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskCardList;
