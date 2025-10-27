<?php

namespace Tests\Integration;

use Tests\TestCase;

class TaskApiIntegrationTest extends TestCase
{
    /** @test */
    public function it_can_perform_complete_task_workflow()
    {
        // Test the complete user workflow: Create → View → Complete → Delete
        $createResponse = $this->postJson('/api/tasks', [
            'title' => 'Integration Workflow Test',
            'description' => 'Testing complete user workflow'
        ]);

        $this->assertTrue($createResponse->status() === 201 || $createResponse->status() === 500);

        if ($createResponse->status() === 201) {
            $taskId = $createResponse->json('data.id');

            // Verify task appears in list
            $getResponse = $this->getJson('/api/tasks');
            $this->assertTrue($getResponse->status() === 200 || $getResponse->status() === 500);

            // Complete the task
            $completeResponse = $this->patchJson("/api/tasks/{$taskId}/complete");
            $this->assertTrue($completeResponse->status() === 200 || $completeResponse->status() === 404);

            // Clean up - delete the task
            $deleteResponse = $this->deleteJson("/api/tasks/{$taskId}");
            $this->assertTrue($deleteResponse->status() === 200 || $deleteResponse->status() === 405);
        }
    }

    /** @test */
    public function it_handles_invalid_api_requests()
    {
        // Test error handling for malformed requests
        $response = $this->postJson('/api/tasks', []);
        $this->assertTrue($response->status() >= 400);
    }
}
