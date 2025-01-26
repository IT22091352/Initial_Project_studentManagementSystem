<?php

// app/Models/Subject.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    // The table associated with the model (optional if it follows naming convention)
    protected $table = 'subjects';

    // The attributes that are mass assignable.
    protected $fillable = [
        'student_id',
        'subject_name',
    ];

    /**
     * Get the student that owns the subject.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
