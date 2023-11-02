import { Timestamp } from "mongodb";
import mongoose, { SchemaType } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 16,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => {
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
        },
        message: "Please enter a valid email address",
      },
    },
    mobile: {
      type: String,
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 8,
    },
    gender: {
      type: String,
    },
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dolqf9s3y/image/upload/v1668325949/TikTok_mqkhq0.png",
      },
      public_id: String,
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    accountType: {
      type: String,
      required: true,
      enm: ["organization", "personal"],
      trim: true,
      // type: SchemaType.ObjectId,
    },
    event: {
      type: Array,
      default: [],
    },
    id: {
      type: String,
      require: true,
      unique: true,
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { Timestamp: true }
);
userSchema.index({ location: "2dsphere" });

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
