"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const task_model_1 = require("../models/task.model");
const project_model_1 = require("../models/project.model");
const user_model_1 = require("../models/user.model");
const search = async (req, res) => {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
        res.status(400).json({ message: "Search query is required" });
        return;
    }
    const words = query.trim().split(/\s+/);
    const regexPatterns = words.map((word) => new RegExp(word, "i"));
    try {
        const tasks = await task_model_1.Task.find({
            $or: [
                { title: { $in: regexPatterns } },
                { description: { $in: regexPatterns } },
            ],
        });
        const projects = await project_model_1.Project.find({
            $or: [
                { name: { $in: regexPatterns } },
                { description: { $in: regexPatterns } },
            ],
        });
        const users = await user_model_1.User.find({
            username: { $in: regexPatterns },
        });
        res.json({ tasks, projects, users });
    }
    catch (error) {
        res.status(500).json({ message: "Error performing Search" });
    }
};
exports.search = search;
