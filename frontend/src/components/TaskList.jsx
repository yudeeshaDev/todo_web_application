import React from 'react';
import TaskCard from './TaskCard';
import { Card, CardContent } from './ui/card';

const TaskList = ({ tasks, onCompleteTask, loading = false, emptyMessage = "No tasks found" }) => {
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

  return (
    <div className="flex flex-col gap-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onCompleteTask={onCompleteTask}
          
        />
      ))}
    </div>
  );
};

export default TaskList;
