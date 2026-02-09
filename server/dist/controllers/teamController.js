import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        const teamsWithUsernames = await Promise.all(teams.map(async (team) => {
            const productOwner = await User.findById({
                _id: team.productOwnerId,
            }).select("username");
            const projectManager = await User.findById({
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
