import mongoose, { Schema } from "mongoose";
const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
}, { timestamps: true });
export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
