import { Request, Response } from "express";
import { Project } from "../models/project.model.js";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects" });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await Project.create({
      name,
      description,
      startDate,
      endDate,
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    console.log("Error Creating a project:", error.message);
    res
      .status(500)
      .json({ message: `Error Creating a project: ${error.message}` });
  }
};
