import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  CheckCircle,
  Clock,
  ListTodo,
  Plus,
  Settings,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "User",
    tasks: {
      total: 0,
      pending: 0,
      completed: 0,
    },
  });

  const [greeting, setGreeting] = useState("");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Load user name from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData((prev) => ({
        ...prev,
        name: user.name || "User",
      }));
    }
  }, []);

  // Fetch task stats from backend
  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks/stats");

        if (!res.ok) {
          throw new Error(`Failed to fetch stats: ${res.statusText}`);
        }

        const statsData = await res.json();

        console.log("Fetched task stats:", statsData);

        setUserData((prev) => ({
          ...prev,
          tasks: {
            total: statsData.taskStats?.total || 0,
            pending: statsData.taskStats?.pending || 0,
            completed: statsData.taskStats?.completed || 0,
          },
        }));
      } catch (err) {
        console.error("Error fetching task stats:", err);
        // Fallback values
        setUserData((prev) => ({
          ...prev,
          tasks: {
            total: 0,
            pending: 0,
            completed: 0,
          },
        }));
      }
    };

    fetchTaskStats(); // Initial load
    const interval = setInterval(fetchTaskStats, 30000); // Refresh every 30 sec

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Navigation items
  const navItems = [
    { name: "All Tasks", icon: <ListTodo className="mr-2" size={20} />, path: "/tasks" },
    { name: "Add New Task", icon: <Plus className="mr-2" size={20} />, path: "/tasks/new" },
    { name: "Analytics", icon: <PieChart className="mr-2" size={20} />, path: "/analytics" },
    { name: "Settings", icon: <Settings className="mr-2" size={20} />, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {greeting}, {userData.name}!
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Sign In as Different User
              </button>
            </div>
            <p className="text-gray-600 mt-2">Here's an overview of your tasks for today. Stay productive!</p>
          </div>
        </section>

        {/* Task Summary */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Task Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <ListTodo className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.tasks.total}</p>
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amber-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 mr-4">
                  <Clock className="text-amber-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.tasks.pending}</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                  <p className="text-2xl font-bold text-gray-800">{userData.tasks.completed}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex items-center"
              >
                {item.icon}
                <span className="font-medium text-gray-700">{item.name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;