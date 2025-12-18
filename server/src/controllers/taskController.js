"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
const task_model_1 = require("../models/task.model");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const tasks = yield task_model_1.Task.find({
            projectId,
            authorUserId: true,
            assignedUserId: true,
            comments: true,
            attachment: true,
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Tasks" });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
        const task = yield task_model_1.Task.create({
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
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating task:${error.message}`, error });
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating task:", req.params, "to status:", req.body);
    const { taskId } = req.params;
    const { status } = req.body;
    if (!status) {
        res.status(400).json({ message: "Status is required" });
    }
    try {
        const updateTask = yield task_model_1.Task.updateOne({
            taskId,
            status,
        });
        res.json(updateTask);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating Tasks: ${error.message}` });
    }
});
exports.updateTaskStatus = updateTaskStatus;
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const tasks = yield task_model_1.Task.find({
            $or: [{ authorUserId: userId }, { assignedUserId: userId }],
        }).select({
            authorUserId: 1,
            assignedUserId: 1,
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving Users Tasks" });
    }
});
exports.getUserTasks = getUserTasks;
