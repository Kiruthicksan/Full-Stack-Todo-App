import express from "express"
import { CreateTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/taskController.js"

const router = express.Router()


router.get("/tasks", getTasks)
router.post("/tasks", CreateTask)
router.get("/task/:id", getTaskById)
router.put("/task/:id", updateTask)
router.delete("/task/:id", deleteTask)

export default router

