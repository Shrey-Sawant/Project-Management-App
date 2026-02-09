import mongoose, { Schema } from "mongoose";
const CommentSchema = new Schema({
    text: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
