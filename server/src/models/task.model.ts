import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate?: Date;
  dueDate?: Date;
  points?: number;
  projectId: mongoose.Types.ObjectId;
  authorUserId: mongoose.Types.ObjectId;
  assignedUserId?: mongoose.Types.ObjectId;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
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
  },
  { timestamps: true }
);

export const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
