import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const TaskForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [showTitleError, setShowTitleError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear title error when user starts typing
    if (name === 'title' && showTitleError) {
      setShowTitleError(false);
    }
  };

  const isTitleInvalid = formData.title.length > 100;
  const isDescriptionInvalid = formData.description.length > 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setShowTitleError(true);
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', description: '' });
    setShowTitleError(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Add a Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="task-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="Task Title"
              className={isTitleInvalid || showTitleError ? 'border-destructive' : ''}
            />
            <div className="flex justify-between items-center">
              {showTitleError && (
                <span className="text-sm text-destructive">Title is required</span>
              )}
              <span className={`text-sm ml-auto ${
                formData.title.length > 100 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {formData.title.length}/100
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              rows={4}
              placeholder="Task Description"
              className={isDescriptionInvalid ? 'border-destructive' : ''}
            />
            <div className="text-right">
              <span className={`text-sm ${
                formData.description.length > 500 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {formData.description.length}/500
              </span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
