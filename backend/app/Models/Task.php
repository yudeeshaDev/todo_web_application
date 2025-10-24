<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    //specify the table name
    protected $table = 'task';

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'completed_at'
    ];

    protected $dates = [
        'completed_at',
        'deleted_at',
    ];


}
