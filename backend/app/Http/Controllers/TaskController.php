<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TaskController 
{



    // public function index()
    // {
    //     return $this->task; 
    // }

     /**
     * Display all tasks for the logged-in user
     */
    public function index(Request $request)
    {
        return $request->user()->tasks; // only their tasks
    }

   
    // public function store(Request $request)
    // {
    //     return $this->task->create($request->all());
    // }

    /**
     * Store a new task for the logged-in user
     */
    public function store(Request $request)
    {
        return $request->user()->tasks()->create([
            'task_name' => $request->task_name,
            'description' => $request->description,
            'due_date' => $request->due_date,
        ]);
    }

   
    // public function show(string $id)
    // {
    //      return $task = $this->task->find($id);
    // }

     /**
     * Show one task, if owned by user
     */
    public function show(Request $request, string $id)
    {
        return $request->user()->tasks()->findOrFail($id);
    }


    // public function update(Request $request, string $id)
    // {
    //     $task = $this->task->find($id);
    //     $task->update($request->all());
    //     return $task;
    // }

    /**
     * Update a task (only if it belongs to the user)
     */
    public function update(Request $request, string $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->update($request->only(['task_name', 'description', 'due_date']));
        return $task;
    }

 
    // public function destroy(string $id)
    // {
    //     $task = $this->task->find($id);
    //     return $task->delete();
    // }

    /**
     * Delete a task (only if it belongs to the user)
     */
    public function destroy(Request $request, string $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
