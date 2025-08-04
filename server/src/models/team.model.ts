import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeam extends Document {
  teamName: String;
  productOwnerUserId: mongoose.Types.ObjectId;
  projectManagerUserId: mongoose.Types.ObjectId;
}

const TeamSchema = new Schema<ITeam>(
  {
    teamName: { type: String, required: true },
    productOwnerUserId: { type: Schema.Types.ObjectId, ref: "User" },
    projectManagerUserId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Team: Model<ITeam>=mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
