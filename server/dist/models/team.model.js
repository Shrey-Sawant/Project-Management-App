import mongoose, { Schema } from "mongoose";
const TeamSchema = new Schema({
    teamName: { type: String, required: true },
    productOwnerUserId: { type: Schema.Types.ObjectId, ref: "User" },
    projectManagerUserId: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);
