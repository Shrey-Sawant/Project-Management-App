import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
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
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
