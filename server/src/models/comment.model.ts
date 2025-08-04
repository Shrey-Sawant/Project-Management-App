import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  text: string;
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    text: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
