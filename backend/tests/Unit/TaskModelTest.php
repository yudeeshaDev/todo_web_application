<?php

namespace Tests\Unit;

use App\Models\Task;

class TaskModelTest extends \PHPUnit\Framework\TestCase
{
    /** @test */
    public function it_has_correct_fillable_attributes()
    {
        $task = new Task();
        $fillable = $task->getFillable();

        $this->assertContains('title', $fillable);
        $this->assertContains('description', $fillable);
        $this->assertContains('is_completed', $fillable);
        $this->assertContains('completed_at', $fillable);
    }

    /** @test */
    public function it_has_correct_table_name()
    {
        $task = new Task();
        $this->assertEquals('task', $task->getTable());
    }

    /** @test */
    public function it_can_set_attributes_directly()
    {
        $task = new Task();
        $task->title = 'Test Task';
        $task->description = 'Test Description';
        $task->is_completed = true;

        $this->assertEquals('Test Task', $task->title);
        $this->assertEquals('Test Description', $task->description);
        $this->assertTrue($task->is_completed);
    }

    /** @test */
    public function it_uses_soft_deletes()
    {
        $task = new Task();
        $this->assertTrue(in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($task)));
    }
}
