const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/stats", taskController.getTaskStats);

router.route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;