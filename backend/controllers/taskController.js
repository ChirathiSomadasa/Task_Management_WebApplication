const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get task stats
exports.getTaskStats = async (req, res) => {
  try {
    // Logging to debug
    console.log("Fetching task stats...");

    // Count all tasks
    const total = await Task.countDocuments();
    console.log("Total tasks count:", total);

    // Count tasks with status "Pending"
    const pending = await Task.countDocuments({ status: "Pending" });
    console.log("Pending tasks count:", pending);

    // Count tasks with status "Done"
    const completed = await Task.countDocuments({ status: "Done" });
    console.log("Completed tasks count:", completed);

    // Respond with the stats
    res.json({
      taskStats: {
        total,
        pending,
        completed,
      },
    });
  } catch (err) {
    console.error("Error fetching task stats:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};