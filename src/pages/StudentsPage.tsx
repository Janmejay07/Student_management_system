import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import { StudentModal } from "../components/StudentModal";
import { Student } from "../types/student";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  // Fetch students from Firestore on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Student));
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  // Add a new student to Firestore
  const handleAddStudent = async (student: Partial<Student>) => {
    try {
      const docRef = await addDoc(collection(db, "students"), student);
      setStudents([...students, { ...student, id: docRef.id } as Student]); 
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  // Edit existing student in Firestore
  const handleEditStudent = async (student: Partial<Student>) => {
    if (!selectedStudent?.id) return;

    try {
      const studentRef = doc(db, "students", selectedStudent.id);
      await updateDoc(studentRef, student);
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...student } : s));
      setIsModalOpen(false);
      setSelectedStudent(undefined);
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  };

  // Delete student from Firestore
  const handleDeleteStudent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        setStudents(students.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Error deleting student: ", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <button
          onClick={() => {
            setSelectedStudent(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add Student</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => alert("View student details: " + student.name)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsModalOpen(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students found. Click "Add Student" to add one.
          </div>
        )}
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(undefined);
        }}
        onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
        student={selectedStudent}
      />
    </div>
  );
};
