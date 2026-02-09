import mongoose, { Schema } from "mongoose";
const TaskAssignmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
}, { timestamps: true });
export const TaskAssignment = mongoose.models.TaskAssignment || mongoose.model("TaskAssignment", TaskAssignmentSchema);
