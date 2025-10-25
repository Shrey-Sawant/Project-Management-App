import { Request, Response } from "express";
import { Task } from "../models/task.model";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await Task.find({
      projectId,
      authorUserId: true,
      assignedUserId: true,
      comments: true,
      attachment: true,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      projectId,
      tags,
      startDate,
      dueDate,
      points,
      authorUserId,
      assignedUserId,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating task:${error.message}`, error });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Updating task:", req.params, "to status:", req.body);

  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ message: "Status is required" });
  }

  try {
    const updateTask = await Task.updateOne({
      taskId,
      status,
    });
    res.json(updateTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating Tasks: ${error.message}` });
  }
};
