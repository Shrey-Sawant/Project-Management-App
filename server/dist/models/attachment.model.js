import mongoose, { Schema } from "mongoose";
const AttachmentSchema = new Schema({
    fileURL: { type: String, required: true },
    fileName: { type: String },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    uploadedById: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
export const Attachment = mongoose.models.Attachment || mongoose.model("Attachment", AttachmentSchema);
