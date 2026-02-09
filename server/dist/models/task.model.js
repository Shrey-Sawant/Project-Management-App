import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String },
    priority: { type: String },
    tags: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date },
    points: { type: Number },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    authorUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedUserId: { type: Schema.Types.ObjectId, ref: "User" },
    attachment: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
