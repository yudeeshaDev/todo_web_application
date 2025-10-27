<?php

namespace Tests\Feature;

use Tests\TestCase;

class BasicTest extends TestCase
{
    /** @test */
    public function laravel_is_working()
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function api_routes_exist()
    {
        $response = $this->get('/api/tasks');
        $this->assertTrue($response->status() >= 200);
    }
}
