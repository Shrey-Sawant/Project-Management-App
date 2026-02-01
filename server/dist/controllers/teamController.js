"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const team_model_1 = require("../models/team.model");
const user_model_1 = require("../models/user.model");
const getTeams = async (req, res) => {
    try {
        const teams = await team_model_1.Team.find();
        const teamsWithUsernames = await Promise.all(teams.map(async (team) => {
            const productOwner = await user_model_1.User.findById({
                _id: team.productOwnerId,
            }).select("username");
            const projectManager = await user_model_1.User.findById({
                _id: team.projectManagerId,
            }).select("username");
            return {
                ...team,
                productOwnerUsername: productOwner?.username,
                projectManagerUsername: projectManager?.username,
            };
        }));
        res.json(teamsWithUsernames);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving *Users" });
    }
};
exports.getTeams = getTeams;
