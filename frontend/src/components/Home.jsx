import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    email: "",
    subject_name: "", // Add subject_name field
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/students");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        const addedStudent = await response.json();
        setStudents((prev) => [...prev, addedStudent]);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setModalOpen(false);
      setNewStudent({ name: "", age: "", email: "", subject_name: "" }); // Reset subject_name
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/students/${selectedStudent.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedStudent),
        }
      );
      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents((prev) =>
          prev.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
      }
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setEditModalOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/students/${id}`, {
        method: "DELETE",
      });
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student List</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Student
        </button>
      </div>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Subject Name</th> {/* Add Subject Name column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.subject_name}</td> {/* Display Subject Name */}
              <td>
                <button
                  className="btn btn-link text-primary"
                  onClick={() => handleEditClick(student)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Student Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label">
                    Name
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    className="form-control"
                    placeholder="Enter student name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="studentAge" className="form-label">
                    Age
                  </label>
                  <input
                    id="studentAge"
                    type="number"
                    className="form-control"
                    placeholder="Enter student age"
                    value={newStudent.age}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, age: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="studentEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="studentEmail"
                    type="email"
                    className="form-control"
                    placeholder="Enter student email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="studentSubjectName" className="form-label">
                    Subject Name
                  </label>
                  <input
                    id="studentSubjectName"
                    type="text"
                    className="form-control"
                    placeholder="Enter subject name"
                    value={newStudent.subject_name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, subject_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddStudent}
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editModalOpen && selectedStudent && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setEditModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="editStudentName"
                    className="form-label align-left"
                  >
                    Name
                  </label>
                  <input
                    id="editStudentName"
                    type="text"
                    className="form-control"
                    placeholder="Enter student name"
                    value={selectedStudent.name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editStudentAge" className="form-label">
                    Age
                  </label>
                  <input
                    id="editStudentAge"
                    type="number"
                    className="form-control"
                    placeholder="Enter student age"
                    value={selectedStudent.age}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        age: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editStudentEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="editStudentEmail"
                    type="email"
                    className="form-control"
                    placeholder="Enter student email"
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editStudentSubjectName" className="form-label">
                    Subject Name
                  </label>
                  <input
                    id="editStudentSubjectName"
                    type="text"
                    className="form-control"
                    placeholder="Enter subject name"
                    value={selectedStudent.subject_name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        subject_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateStudent}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;