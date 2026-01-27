import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  cognitoId?: string
  username: string
  email: string
  password?: string
  profilePictureUrl?: string
  teamId?: mongoose.Types.ObjectId
}

const UserSchema = new Schema<IUser>(
  {
    cognitoId: { type: String, unique: true, sparse: true },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false, 
    },

    profilePictureUrl: { type: String },

    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
