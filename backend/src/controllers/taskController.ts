import type { Request, Response } from "express";
import { Task, type ITask } from "../models/taskModel.js";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find();
    res.status(200).json({ message: "Task Fetched Successfully", tasks });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Fetching Failed", error: (error as Error).message });
  }
};

export const CreateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { task } = req.body;
    if (typeof task !== "string" || task.trim() === "") {
      res.status(400).json({ message: "Title is Required" });
      return;
    }

    const newTask: ITask = await Task.create({
      task: task.trim(),
      completed: false,
    });
    res.status(201).json({ message: "Task Created successfully", newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task Not found" });
      return;
    }

    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { task, completed } = req.body;
    const id = req.params.id;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (typeof task === "string" && task.trim() !== "") {
      existingTask.task = task.trim();
    }

    if (typeof completed === "boolean") {
      existingTask.completed = completed;
    }

    const updatedTask = await existingTask.save();
    res.status(200).json({ message: "Updated Successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Something Went Wrong",
        error: (error as Error).message,
      });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Something went wrong",
        error: (error as Error).message,
      });
  }
};
