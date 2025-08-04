import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITaskAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  taskId: mongoose.Types.ObjectId;
}

const TaskAssignmentSchema: Schema<ITaskAssignment> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  },
  { timestamps: true }
);

export const TaskAssignment: Model<ITaskAssignment> =
  mongoose.models.TaskAssignment || mongoose.model<ITaskAssignment>("TaskAssignment", TaskAssignmentSchema);
