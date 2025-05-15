// src/pages/AllTasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import jsPDF and autoTable plugin
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Automatically attaches autoTable

const AllTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks");
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks.");
        setLoading(false);
        toast.error("Failed to load tasks.");
      }
    };

    fetchTasks();
  }, []);

  // Handle delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      toast.success("Task deleted successfully!");
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      toast.error("Failed to delete task.");
      console.error(err);
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const generatePDF = () => {
  toast.info("Generating PDF...");

  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("Task Management Report", 14, 16);

  const tableColumn = ["Title", "Deadline", "Assigned To", "Status"];
  const tableRows = tasks.map((task) => [
    task.title,
    new Date(task.deadline).toLocaleDateString(),
    task.assignedTo,
    task.status,
  ]);

  // ✅ Now autoTable should be available
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [37, 99, 235] }, // Blue header
  });

  doc.save("task-report.pdf");
  toast.success("PDF generated successfully!");
};
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">All Tasks</h2>
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
          >
            Generate PDF Report
          </button>
        </div>

        {/* Task Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{task.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                          task.status === "Done"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AllTasks;