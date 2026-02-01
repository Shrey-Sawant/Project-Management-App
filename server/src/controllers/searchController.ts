import { Request, Response } from "express";
import { Task } from "../models/task.model.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    res.status(400).json({ message: "Search query is required" });
    return;
  }

  const words = query.trim().split(/\s+/);

  const regexPatterns = words.map((word) => new RegExp(word, "i"));

  try {
    const tasks = await Task.find({
      $or: [
        { title: { $in: regexPatterns } },
        { description: { $in: regexPatterns } },
      ],
    });
    const projects = await Project.find({
      $or: [
        { name: { $in: regexPatterns } },
        { description: { $in: regexPatterns } },
      ],
    });
    const users = await User.find({
      username: { $in: regexPatterns },
    });

    res.json({ tasks, projects, users });
  } catch (error) {
    res.status(500).json({ message: "Error performing Search" });
  }
};
