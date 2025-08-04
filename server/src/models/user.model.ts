import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  cognitoId: string;
  username: string;
  profilePictureUrl?: string;
  teamId?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    cognitoId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePictureUrl: { type: String },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
