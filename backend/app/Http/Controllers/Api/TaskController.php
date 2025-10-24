<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //create new task
    public function store(Request $request){

        try {
            //validate inputs
            $validated =  $request->validate([
                    'title' => 'required|string',
                    'description' => 'nullable|string'
            ]);

            $task = Task::create($validated);

            return ApiResponse::success($task, 'Task created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Failed to create task', 500, $e->getMessage());
        }
    }

    //update existing task
    public function update(Request $request, $id){
        try {
            $task = Task::findOrFail($id);

            if (!$task) {
                return ApiResponse::notFound('Task not found');
            }

            $validated = $request->validate([
                'title' => 'required|string',
                'description' => 'nullable|string',
                'is_completed' => 'nullable|boolean',
            ]);

            $task->update($validated);

            return ApiResponse::success($task, 'Task updated successfully');
        } catch (Exception $e) {
            return ApiResponse::error('Failed to update task', 500, $e->getMessage());
        }
    }

    //get all tasks
    public function index(Request $request) {
        try {
            $query = Task::query();

            if ($request->has('completed')) {
                $query->where('is_completed', filter_var($request->completed, FILTER_VALIDATE_BOOLEAN));
            }

            if ($request->has('sort')) {
                $query->orderBy('created_at', $request->sort === 'asc' ? 'asc' : 'desc');
            } else {
                $query->latest();
            }

            if($request->has('limit')) {
                $query->take((int) $request->limit);
            }

            $tasks = $query->get();

            return ApiResponse::success($tasks, 'Tasks retrieved successfully');

        } catch (Exception $e) {
            return ApiResponse::error('Failed to retrieve tasks', 500, $e->getMessage());
        }
    }

    //mark as completed(done)
    public function markAsCompleted($id)
    {
        try {
            $task = Task::findOrFail($id);

            if (!$task) {
                return ApiResponse::notFound('Tak not found');
            }

            if($task->is_completed) {
                return ApiResponse::error('Task is already completed');
            }
            $task->is_completed = true;
            $task->completed_at = now();
            $task->save();

            return ApiResponse::success($task, 'Task marked as completed');

        } catch (Exception $e) {
            return ApiResponse::error('Failed to mark task as completed', 500, $e->getMessage());
        }
    }
}
