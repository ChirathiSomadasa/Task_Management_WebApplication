import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Material Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PersonIcon from "@mui/icons-material/Person"
import DescriptionIcon from "@mui/icons-material/Description"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ErrorIcon from "@mui/icons-material/Error"
import EditIcon from "@mui/icons-material/Edit"

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`)
        setTask(res.data)
      } catch (err) {
        toast.error("Failed to load task details.")
        navigate("/tasks")
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id, navigate])

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800 border-green-300"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-red-100 text-red-800 border-red-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done":
        return <CheckCircleIcon style={{ fontSize: 18, marginRight: 4 }} />
      case "In Progress":
        return <AccessTimeIcon style={{ fontSize: 18, marginRight: 4 }} />
      default:
        return <ErrorIcon style={{ fontSize: 18, marginRight: 4 }} />
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="h-10 bg-gray-200 rounded w-24 ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ArrowBackIcon style={{ fontSize: 18, marginRight: 8 }} />
            Back to Tasks
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">{task.title}</h2>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
              >
                {getStatusIcon(task.status)}
                {task.status}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                <DescriptionIcon style={{ fontSize: 18, marginRight: 8, color: "#9ca3af" }} />
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-md border border-gray-100">
                {task.description || "No description provided."}
              </p>
            </div>

            <hr className="border-gray-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                  <CalendarTodayIcon style={{ fontSize: 18, marginRight: 8, color: "#9ca3af" }} />
                  Deadline
                </h3>
                <p className="text-gray-800 font-medium">{formatDate(task.deadline)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                  <PersonIcon style={{ fontSize: 18, marginRight: 8, color: "#9ca3af" }} />
                  Assigned To
                </h3>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                    {task.assignedTo.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-gray-800 font-medium">{task.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 flex justify-end p-4">
            <div className="flex gap-3">
              <button
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/tasks/edit/${id}`)}
              >
                <EditIcon style={{ fontSize: 18, marginRight: 8 }} />
                Edit Task
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default TaskDetails
