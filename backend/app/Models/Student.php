<?php

// app/Models/Student.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // The table associated with the model (optional if it follows naming convention)
    protected $table = 'students';

    // The attributes that are mass assignable.
    protected $fillable = [
        'name',
        'email',
        'age', 
        'subject_name',
    ];

    /**
     * Get the subject associated with the student.
     */
    public function subject()
    {
        return $this->hasOne(Subject::class);
    }
}
