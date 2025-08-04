import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttachment extends Document {
  fileURL: string;
  fileName?: string;
  taskId: mongoose.Types.ObjectId;
  uploadedById: mongoose.Types.ObjectId;
}

const AttachmentSchema: Schema<IAttachment> = new Schema(
  {
    fileURL: { type: String, required: true },
    fileName: { type: String },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    uploadedById: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Attachment: Model<IAttachment> =
  mongoose.models.Attachment || mongoose.model<IAttachment>("Attachment", AttachmentSchema);
