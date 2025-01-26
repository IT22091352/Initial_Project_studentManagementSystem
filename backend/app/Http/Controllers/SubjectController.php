<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_name' => 'required|string',
        ]);

        $subject = Subject::create($validated);
        return response()->json($subject, 201);
    }

    public function show($id)
    {
        $subject = Subject::with('student')->findOrFail($id);
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_name' => 'required|string',
        ]);

        $subject = Subject::findOrFail($id);
        $subject->update($validated);
        return response()->json($subject);
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();

        return response()->json(['message' => 'Subject deleted successfully.']);
    }
}
