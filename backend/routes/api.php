<?php
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;


//task routes
Route::prefix('tasks')->group(function () {

    Route::post('/', [TaskController::class, 'store'])->name('tasks.store');

    Route::put('/{id}', [TaskController::class, 'update'])->name('tasks.update');

    //get all task

    Route::get('/', [TaskController::class, 'index'])->name('tasks.index');

    Route::patch('/{id}/complete', [TaskController::class, 'markAsCompleted']);
});
