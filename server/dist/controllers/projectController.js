"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjects = void 0;
const project_model_1 = require("../models/project.model");
const getProjects = async (req, res) => {
    try {
        const projects = await project_model_1.Project.find();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving projects" });
    }
};
exports.getProjects = getProjects;
const createProject = async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = await project_model_1.Project.create({
            name,
            description,
            startDate,
            endDate,
        });
        res.status(201).json(newProject);
    }
    catch (error) {
        console.log("Error Creating a project:", error.message);
        res
            .status(500)
            .json({ message: `Error Creating a project: ${error.message}` });
    }
};
exports.createProject = createProject;
