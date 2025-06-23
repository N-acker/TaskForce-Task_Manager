<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task_manager';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id', //added
        'task_name',
        'description',
        'due_date'
    ];
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
