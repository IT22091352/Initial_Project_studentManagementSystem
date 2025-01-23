<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'email' => 'required|string|email',
        ]);

        $student = Student::create($request->all());
        return response()->json($student, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string',
            'age' => 'sometimes|required|integer',
            'email' => 'sometimes|required|string|email',
        ]);

        try {
            $student = Student::findOrFail($id);
            $student->update($request->all());
            return response()->json($student, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Student not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $student = Student::findOrFail($id);
            $student->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Student not found'], 404);
        }
    }
}






























// {
//     public function index()
//     {
//         $students = Student::all();
//         return view('students.index', compact('students'));
//     }

//     public function create()
//     {
//         return view('students.create');
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required',
//             'age' => 'required',
//             'email' => 'required',
//         ]);

//         Student::create($request->all());

//         return redirect()->route('students.index')
//             ->with('success', 'Student created successfully.');
//     }

//     public function show(Student $student)
//     {
//         return view('students.show', compact('student'));
//     }

//     public function edit(Student $student)
//     {
//         return view('students.edit', compact('student'));
//     }

//     public function update(Request $request, Student $student)
//     {
//         $request->validate([
//             'name' => 'required',
//             'age' => 'required',
//             'email' => 'required',
//         ]);

//         $student->update($request->all());

//         return redirect()->route('students.index')
//             ->with('success', 'Student updated successfully');
//     }

//     public function destroy(Student $student)
//     {
//         $student->delete();

//         return redirect()->route('students.index')
//             ->with('success', 'Student deleted successfully');
//     }
// }
