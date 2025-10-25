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
exports.search = void 0;
const task_model_1 = require("../models/task.model");
const project_model_1 = require("../models/project.model");
const user_model_1 = require("../models/user.model");
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
        res.status(400).json({ message: "Search query is required" });
        return;
    }
    const words = query.trim().split(/\s+/);
    const regexPatterns = words.map((word) => new RegExp(word, "i"));
    try {
        const tasks = yield task_model_1.Task.find({
            $or: [
                { title: { $in: regexPatterns } },
                { description: { $in: regexPatterns } },
            ],
        });
        const projects = yield project_model_1.Project.find({
            $or: [
                { name: { $in: regexPatterns } },
                { description: { $in: regexPatterns } },
            ],
        });
        const users = yield user_model_1.User.find({
            username: { $in: regexPatterns },
        });
        res.json({ tasks, projects, users });
    }
    catch (error) {
        res.status(500).json({ message: "Error performing Search" });
    }
});
exports.search = search;
