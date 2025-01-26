<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with('subject')->get();
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:students,email',
            'age' => 'required|integer',
            'subject_name' => 'required|string',
        ]);

        $student = Student::create($validated);
        $subject = Subject::create([
            'student_id' => $student->id,
            'subject_name' => $request->subject_name,
        ]);

        return response()->json(['student' => $student, 'subject' => $subject], 201);
    }

    public function show($id)
    {
        $student = Student::with('subject')->findOrFail($id);
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:students,email,' . $id,
            'age' => 'required|integer',
            'subject_name' => 'required|string',
        ]);

        $student = Student::findOrFail($id);
        $student->update($validated);

        $subject = $student->subject;
        $subject->update(['subject_name' => $request->subject_name]);

        return response()->json(['student' => $student, 'subject' => $subject]);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->subject->delete();
        $student->delete();

        return response()->json(['message' => 'Student and subject deleted successfully.']);
    }
}
